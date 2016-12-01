class PropertiesController < ApplicationController
  DATE_FORMAT = '%m/%d/%Y'.freeze

  def index
    search_hash = { area: params[:area], start_date: params[:start_date], end_date: params[:end_date], guests: params[:guests], sort: params[:sort] }
    searcher = PropertyRetriever.new search_hash
    units = searcher.retrieve
    @units = WillPaginate::Collection.create((params[:page] || 1).to_i, 10, units.count) do |pager|
      pager.replace(units[pager.offset, pager.per_page].to_a)
    end
  end

  def show
    @id                = params[:id]
    @booking_id        = params[:id].to_str.split('-', 2).last
    @unit              = UnitRepository.get(@id)
    @property_title    = @unit.name
    @property_subtitle = @unit.address[:street]
    @amenities         = @unit.available_amenities
    @guests            = params[:guests] || 1
    @guest_amount_list = (1..@unit.occupancy).map { |v| v }
    @start_date        = !params[:start_date].blank? ? params[:start_date] : Date.today.strftime(DATE_FORMAT)
    @end_date          = !params[:end_date].blank? ? params[:end_date] : (Date.today + 7).strftime(DATE_FORMAT)
    @random_units      = UnitRepository.random_units(limit: 3, except: [@id])

    lookup_rates if [:start_date, :end_date, :guests].all? { |k| params.key?(k) && !params[k].blank? }
    get_images
  end

  private

  def lookup_rates
    @lookup         = true
    @available      = true
    start_date      = Date.strptime(@start_date, DATE_FORMAT)
    end_date        = Date.strptime(@end_date, DATE_FORMAT)
    @length_of_stay = end_date.mjd - start_date.mjd
    @guests         = @guests == "all" ? 1 : @guests

    @rates = Stay.lookup(@id,
                        start_date: start_date,
                        end_date: end_date,
                        guests: @guests)

    @nightly_rate      = '%.2f' % (@rates.base_amount / @length_of_stay)
    @base_amount       = '%.2f' % @rates.base_amount
    @tax_amount        = '%.2f' % @rates.taxes[0].amount
    @fees              = @rates.fees
    @total_amount      = '%.2f' % @rates.total_amount
  rescue Stay::Unavailable
    @available = false
  end

  def get_images
    @videos = @unit.videos
    @standard_images = @unit.standard_images
    @large_images = @unit.large_images
  end

end
