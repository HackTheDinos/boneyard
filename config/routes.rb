Rails.application.routes.draw do
  resources :specimens
  resources :scans

  root 'root#index'
end
