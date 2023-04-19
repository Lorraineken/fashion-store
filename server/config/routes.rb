Rails.application.routes.draw do

  resources :products_categories
  resources :roles
  resources :user_roles
  resources :categories
  resources :products
  resources :comments
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
