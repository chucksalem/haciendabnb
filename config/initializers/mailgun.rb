ActionMailer::Base.smtp_settings = { 
  port: 587, 
  address: 'smtp.mailgun.org', 
  user_name: 'postmaster@mg.gooceano.com', 
  password: '5925f786039fc96af3c43ba8a7707cc1', 
  domain: 'mg.gooceano.com', 
  authentication: :plain, 
} 

ActionMailer::Base.delivery_method = :smtp
