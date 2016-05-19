ActionMailer::Base.smtp_settings = { 
  port: '587',
  address: 'smtp.mailgun.org',
  user_name: 'postmaster@sandboxf2eeb8336db646d9adbd76440f585543.mailgun.org',
  password: '65a98e512276993f01297efdf898faf5',
  domain: 'sandboxf2eeb8336db646d9adbd76440f585543.mailgun.org',
  authentication: :plain,
  enable_starttls_auto: true
} 

ActionMailer::Base.delivery_method = :smtp
