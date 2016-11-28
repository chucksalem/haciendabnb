threads 0,8
workers 2
preload_app!

daemonize true

pidfile ENV['PID_PATH'] || 'tmp/pids/puma.pid'

port 5001
