Rails.application.routes.draw do
  # API routes
  namespace :api do
    namespace :v1 do
      get 'health', to: 'health#index'
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
