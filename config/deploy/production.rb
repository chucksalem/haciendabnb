role :app, %w(haciendabnb@184.168.146.56)

set :pty, true

set :user, 'haciendabnb'
set :deploy_to, -> { "/home/haciendabnb/app" }

set :stage, 'production'
