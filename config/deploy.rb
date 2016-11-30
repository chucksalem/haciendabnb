# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'haciendabnb'
set :repo_url, 'git@github.com:chucksalem/haciendabnb.git'
set :branch, 'master'

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')
set :linked_files, %w{config/application.yml}

set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }
set :whenever_roles,      ->{ :app }

set :puma_workers, 2
set :puma_preload_app, true

namespace :foreman do
  desc 'Export the Procfile to upstart'
  task :export do
    on roles(:app) do
      within current_path do
        execute "bundle exec foreman export upstart /etc/init --procfile=./Procfile -a #{fetch(:application)} -u #{fetch(:user)} -l #{current_path}/log --template #{current_path}/upstart"
      end
    end
  end

  desc 'Start the application'
  task :start do
    on roles(:app) do
      within current_path do
        execute "start #{fetch(:application)}"
      end
    end

  end

  desc 'Stop the application'
  task :stop do
    on roles(:app) do
      within current_path do
        execute "stop #{fetch(:application)}"
      end
    end
  end

  desc 'Restart the application'
  task :restart do
    on roles(:app) do
      within current_path do
        execute "restart #{fetch(:application)} || start #{fetch(:application)}"
      end
    end
  end

  desc 'Puma start' 
  task :puma_start do
    on roles(:app) do
      within current_path do
        execute "cd #{current_path} && ~/.rvm/bin/rvm default do bundle exec puma -C config/puma.rb"
      end
    end
  end
end

# after 'deploy:publishing', 'foreman:export'
# after 'deploy:publishing', 'foreman:start'
# after 'deploy:publishing', 'foreman:puma_start'
