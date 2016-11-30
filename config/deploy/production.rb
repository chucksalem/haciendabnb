server "192.155.86.203", user: "deploy", roles: %w{web app db}

set :pty, true

set :user, 'deploy'
set :deploy_to, -> { "/home/apps/haciendabnb" }

set :stage, 'production'
