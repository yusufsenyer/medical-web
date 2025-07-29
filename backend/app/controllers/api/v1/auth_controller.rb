class Api::V1::AuthController < ApplicationController

  private

  # Simple authentication helper (in production, use proper JWT)
  def current_user
    # For now, just find user by email from params or headers
    email = params[:email] || request.headers['X-User-Email']
    User.find_by(email: email) if email
  end

  public
  # Access to users list from UsersController
  def self.add_user_to_list(user_data)
    Api::V1::UsersController.class_variable_set(:@@registered_users,
      Api::V1::UsersController.class_variable_get(:@@registered_users) || [])
    users = Api::V1::UsersController.class_variable_get(:@@registered_users)

    # Check if user already exists
    existing_user = users.find { |u| u[:email] == user_data[:email] }
    unless existing_user
      users << user_data
    end
  end
  def register
    user_params = params.require(:user).permit(:firstName, :lastName, :email, :password)

    begin
      # Create new user with database
      user = User.new(
        first_name: user_params[:firstName],
        last_name: user_params[:lastName],
        email: user_params[:email],
        password: user_params[:password], # In production, hash this!
        role: 'user',
        is_active: true,
        last_login: Time.current
      )

      if user.save
        # Generate fake JWT token
        token = "fake_jwt_token_#{rand(100000..999999)}"

        render json: {
          success: true,
          message: 'User registered successfully',
          data: {
            user: user.as_json,
            token: token
          }
        }, status: :created
      else
        render json: {
          success: false,
          message: 'Kayıt sırasında bir hata oluştu',
          errors: user.errors.full_messages
        }, status: :unprocessable_entity
      end
    rescue => e
      render json: {
        success: false,
        message: 'Kayıt sırasında bir hata oluştu',
        errors: [e.message]
      }, status: :unprocessable_entity
    end
  rescue ActionController::ParameterMissing => e
    render json: {
      success: false,
      message: 'Missing required parameters',
      errors: [e.message]
    }, status: :bad_request
  rescue => e
    render json: {
      success: false,
      message: 'Registration failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end

  def login
    user_params = params.require(:user).permit(:email, :password)

    begin
      # Find user in database
      user = User.find_by(email: user_params[:email].downcase)

      if user && user.password == user_params[:password] # In production, use bcrypt
        # Update last login
        user.update_last_login!

        # Generate fake JWT token
        token = "fake_jwt_token_#{rand(100000..999999)}"

        render json: {
          success: true,
          message: 'Login successful',
          data: {
            user: user.as_json,
            token: token
          }
        }
      else
        render json: {
          success: false,
          message: 'Geçersiz email veya şifre',
          errors: ['Invalid credentials']
        }, status: :unauthorized
      end
    rescue => e
      render json: {
        success: false,
        message: 'Giriş sırasında bir hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end

  def profile
    begin
      # For now, get user by email from params (in production, use JWT)
      email = params[:email]
      user = User.find_by(email: email) if email

      if user
        render json: {
          success: true,
          data: user.as_json
        }
      else
        render json: {
          success: false,
          message: 'Kullanıcı bulunamadı',
          errors: ['User not found']
        }, status: :not_found
      end
    rescue => e
      render json: {
        success: false,
        message: 'Profil bilgileri alınırken hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end

  def update_profile
    user_params = params.require(:user).permit(:id, :firstName, :lastName, :email, :phone, :company, :bio)

    begin
      # Find user in database
      user = User.find(user_params[:id])

      # Update user attributes
      user.update!(
        first_name: user_params[:firstName],
        last_name: user_params[:lastName],
        email: user_params[:email],
        phone: user_params[:phone],
        company: user_params[:company],
        bio: user_params[:bio]
      )

      render json: {
        success: true,
        message: 'Profil başarıyla güncellendi',
        data: {
          user: user.as_json
        }
      }

    rescue ActiveRecord::RecordNotFound
      render json: {
        success: false,
        message: 'Kullanıcı bulunamadı',
        errors: ['User not found']
      }, status: :not_found
    rescue ActiveRecord::RecordInvalid => e
      render json: {
        success: false,
        message: 'Profil güncellenirken hata oluştu',
        errors: e.record.errors.full_messages
      }, status: :unprocessable_entity
    rescue => e
      render json: {
        success: false,
        message: 'Profil güncellenirken hata oluştu',
        errors: [e.message]
      }, status: :unprocessable_entity
    end
  end
end
