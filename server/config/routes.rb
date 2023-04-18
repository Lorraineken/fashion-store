Rails.application.routes.draw do
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
