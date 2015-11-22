Rails.application.routes.draw do
  namespace :api do
    resources :specimens, only: [:index, :show, :create, :update]
    resources :scans, only: [:show, :create, :update]
    resources :rendered_assets, only: [:show, :create, :update]
  end

  root 'root#index'
  get '/*path' => redirect('/#/%{path}')
end
