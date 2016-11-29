role :app, %w(deploy@192.155.86.203)

set :pty, true

set :user, 'deploy'
set :deploy_to, -> { "/home/apps/haciendabnb" }

set :stage, 'production'
