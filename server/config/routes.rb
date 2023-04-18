Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  #authentication routes
  post '/auth/login', to: "authentication#login_account"
  post '/auth/register', to: "authentication#create_account"
  delete '/auth/logout', to: "authentication#logout_account"

  #cart

  #order
  
end
