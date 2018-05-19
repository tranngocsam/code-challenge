Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => "pages#spa"

  namespace :api, :defaults => {:format => 'json'} do
    namespace :v1 do
      resources :sessions, only: [] do
        collection do
          get :info
        end
      end

      resources :patients, only: [:create]
      resources :formulations, :only => [:index] do
        resources :formulation_ingredients, :only => [:index]
      end
    end
  end

  resources :patients, :only => [:show]
end
