Rails.application.routes.draw do

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  #authentication routes
  post "/auth/login", to: "authentication#login_account"
  post "/auth/register", to: "authentication#create_account"
  delete "/auth/logout", to: "authentication#logout_account"

  #payment
  post "payments/create", to: "payment#create"

  #order
  post "/make_order", to: "order#make_order"
  get "/orders", to: "order#index"
  get "/orders/:id", to: "order#show"
  delete "orders/:id", to: "order#destroy"
end
