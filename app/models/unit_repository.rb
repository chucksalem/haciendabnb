class UnitRepository
  TTL_SECONDS = (24 * 60 * 60).freeze

  def self.stay(code, criteria)
    Stay.lookup(code, criteria)
  end

  def self.search(criteria)
    key   = "search:#{hash_to_key(criteria)}"
    value = redis.get(key)
    return MultiJson.load(value) unless value.nil?
    Unit.search(criteria).tap { |c| redis.setex(key, TTL_SECONDS, MultiJson.dump(c)) }
  end

  def self.units_in_area(key)
    redis.smembers("areas:#{key}")
  end

  def self.get(code)
    raw = redis.get("units:#{code}")
    raise Unit::NotFound if raw.nil?
    hash = MultiJson.load(raw, symbolize_keys: true)
    Unit.from_hash(hash)
  end

  def self.random_units(limit: 2, except: [])
    except_keys = except.map { |code| "units:#{code}" }
    all         = redis.keys('units:*') - except_keys
    codes       = all.sample(limit).map! { |k| k.sub('units:', '') }

    codes.each_with_object([]) do |code, accum|
      if ['1911-89482', '1911-89479', '1911-112148', '1911-89477', '1911-89481', '1911-89483', '1911-89480', '1911-89478'].include? code
        accum << self.get(code)
      end
      accum
    end
  end

  def self.hash_to_key(hash)
    flatten_nested_hash(hash).flatten.join(':')
  end

  def self.flatten_nested_hash(hash)
    hash.each_with_object({}) do |(key, val), h|
      if val.is_a?(Hash)
        flatten_nested_hash(val).map { |hk, hv| h["#{key}:#{hk}"] = hv }
      else
        h[key] = val
      end
    end
  end

  def self.redis
    RedisClient
  end
end
