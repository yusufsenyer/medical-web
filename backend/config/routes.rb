Rails.application.routes.draw do
  # API routes
  namespace :api do
    namespace :v1 do
      get 'health', to: 'health#index'

      # Auth routes
      post 'auth/register', to: 'auth#register'
      post 'auth/login', to: 'auth#login'
      get 'auth/profile', to: 'auth#profile'
      put 'auth/update-profile', to: 'auth#update_profile'

      # Orders routes
      resources :orders, only: [:index, :show, :create, :update, :destroy] do
        member do
          put 'status', to: 'orders#update_status'
        end
      end

      # Users routes (admin only)
      resources :users, only: [:index, :show] do
        member do
          put 'status', to: 'users#update_status'
          put 'role', to: 'users#update_role'
        end
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
