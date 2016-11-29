threads 0,8
workers 2
preload_app!
bind "unix://#{shared_dir}/tmp/puma.sock"

daemonize true

pidfile ENV['PID_PATH'] || 'tmp/pids/puma.pid'

port 5001
