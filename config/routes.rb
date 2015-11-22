Rails.application.routes.draw do
  namespace :api do
    resources :specimens, only: [:index]
    resources :scans
  end

  root 'root#index'
  get '/*path' => redirect('/#/%{path}')
end
