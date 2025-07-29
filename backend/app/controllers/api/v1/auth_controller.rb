class Api::V1::AuthController < ApplicationController
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
    
    # Simulate user creation (replace with actual User model later)
    user_data = {
      id: rand(1000..9999),
      firstName: user_params[:firstName],
      lastName: user_params[:lastName],
      email: user_params[:email],
      fullName: "#{user_params[:firstName]} #{user_params[:lastName]}",
      createdAt: Time.current.iso8601,
      role: 'user'
    }
    
    # Simulate token generation
    token = "fake_jwt_token_#{rand(100000..999999)}"

    # Add user to users list
    self.class.add_user_to_list(user_data)

    render json: {
      success: true,
      message: 'User registered successfully',
      data: {
        user: user_data,
        token: token
      }
    }, status: :created
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

    # Simulate user authentication (replace with actual authentication later)
    if user_params[:email].present? && user_params[:password].present?
      # Check if admin credentials
      if user_params[:email] == 'admin123@gmail.com' && user_params[:password] == 'admin123'
        user_data = {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: user_params[:email],
          fullName: 'Admin User',
          createdAt: Time.current.iso8601,
          role: 'admin'
        }
      else
        # Try to find existing user in users list
        Api::V1::UsersController.class_variable_set(:@@registered_users,
          Api::V1::UsersController.class_variable_get(:@@registered_users) || [])
        users = Api::V1::UsersController.class_variable_get(:@@registered_users)
        existing_user = users.find { |u| u[:email] == user_params[:email] }

        if existing_user
          user_data = existing_user.dup
          user_data[:lastLogin] = Time.current.iso8601
        else
          user_data = {
            id: rand(1000..9999),
            firstName: 'Test',
            lastName: 'User',
            email: user_params[:email],
            fullName: 'Test User',
            createdAt: Time.current.iso8601,
            role: 'user'
          }
        end
      end

      token = "fake_jwt_token_#{rand(100000..999999)}"

      # Add user to users list (if not admin)
      unless user_data[:role] == 'admin'
        # Update user data with last login
        user_data[:lastLogin] = Time.current.iso8601
        user_data[:isActive] = true
        self.class.add_user_to_list(user_data)
      end

      render json: {
        success: true,
        message: 'Login successful',
        data: {
          user: user_data,
          token: token
        }
      }
    else
      render json: {
        success: false,
        message: 'Invalid credentials',
        errors: ['Email and password are required']
      }, status: :unauthorized
    end
  rescue => e
    render json: {
      success: false,
      message: 'Login failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end

  def profile
    # Simulate getting user profile (replace with actual authentication later)
    user_data = {
      id: rand(1000..9999),
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      fullName: 'Test User',
      createdAt: Time.current.iso8601,
      role: 'user'
    }
    
    render json: {
      success: true,
      data: user_data
    }
  end

  def update_profile
    user_params = params.require(:user).permit(:id, :firstName, :lastName, :email, :phone, :company, :bio)

    begin
      # Update user in users list
      Api::V1::UsersController.class_variable_set(:@@registered_users,
        Api::V1::UsersController.class_variable_get(:@@registered_users) || [])
      users = Api::V1::UsersController.class_variable_get(:@@registered_users)

      user_index = users.find_index { |u| u[:id] == user_params[:id].to_i }

      if user_index
        users[user_index].merge!({
          firstName: user_params[:firstName],
          lastName: user_params[:lastName],
          fullName: "#{user_params[:firstName]} #{user_params[:lastName]}",
          email: user_params[:email],
          phone: user_params[:phone],
          company: user_params[:company],
          bio: user_params[:bio],
          updatedAt: Time.current.iso8601
        })

        updated_user = users[user_index]

        render json: {
          success: true,
          message: 'Profile updated successfully',
          data: {
            user: updated_user
          }
        }
      else
        render json: {
          success: false,
          message: 'User not found',
          errors: ['User not found']
        }, status: :not_found
      end

    rescue => e
      render json: {
        success: false,
        message: 'Profile update failed',
        errors: [e.message]
      }, status: :unprocessable_entity
    end
  end

  def forgot_password
    email = params.require(:email)

    begin
      # Generate simple reset token
      reset_token = SecureRandom.urlsafe_base64(32)

      # Store token in class variable (simulated)
      @@reset_tokens ||= {}
      @@reset_tokens[reset_token] = {
        email: email,
        expires_at: 1.hour.from_now,
        created_at: Time.current
      }

      # Try to send real email via SendGrid, fallback to console
      reset_url = "#{ENV['FRONTEND_URL'] || 'http://localhost:3001'}/auth/reset-password?token=#{reset_token}"

      # Check if SendGrid is configured
      if ENV['SENDGRID_API_KEY'].present? && ENV['SENDGRID_FROM_EMAIL'].present?
        begin
          result = EmailService.send_password_reset_email(email, reset_token)

          if result[:success]
            Rails.logger.info "Password reset email sent successfully to #{email}"
            render json: {
              success: true,
              message: 'Şifre sıfırlama e-postası gönderildi. E-posta kutunuzu kontrol edin.'
            }
            return
          else
            Rails.logger.error "Failed to send email: #{result[:message]}"
            # Continue to fallback
          end
        rescue => email_error
          Rails.logger.error "Email service error: #{email_error.message}"
          # Continue to fallback
        end
      end

      # Fallback: Log to console (for development)
      Rails.logger.info "=== PASSWORD RESET EMAIL ==="
      Rails.logger.info "To: #{email}"
      Rails.logger.info "Reset URL: #{reset_url}"
      Rails.logger.info "Token: #{reset_token}"
      Rails.logger.info "Expires: #{1.hour.from_now}"
      Rails.logger.info "=========================="

      render json: {
        success: true,
        message: 'Şifre sıfırlama e-postası gönderildi. E-posta kutunuzu kontrol edin.',
        debug: {
          reset_url: reset_url,
          token: reset_token,
          expires_at: 1.hour.from_now,
          note: 'SendGrid not configured, using console fallback'
        }
      }

    rescue ActionController::ParameterMissing => e
      render json: {
        success: false,
        message: 'E-posta adresi gereklidir',
        errors: [e.message]
      }, status: :bad_request
    rescue => e
      Rails.logger.error "Forgot password error: #{e.message}"
      render json: {
        success: false,
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end

  def reset_password
    token = params.require(:token)
    new_password = params.require(:password)

    begin
      # Validate and consume token from class variable
      @@reset_tokens ||= {}
      token_data = @@reset_tokens[token]

      unless token_data
        render json: {
          success: false,
          message: 'Geçersiz token',
          errors: ['Token geçersiz']
        }, status: :unprocessable_entity
        return
      end

      # Check if token is expired
      if token_data[:expires_at] < Time.current
        @@reset_tokens.delete(token)
        render json: {
          success: false,
          message: 'Süresi dolmuş token',
          errors: ['Token süresi dolmuş']
        }, status: :unprocessable_entity
        return
      end

      email = token_data[:email]
      @@reset_tokens.delete(token) # Consume token

      # Update user password in users list
      Api::V1::UsersController.class_variable_set(:@@registered_users,
        Api::V1::UsersController.class_variable_get(:@@registered_users) || [])
      users = Api::V1::UsersController.class_variable_get(:@@registered_users)

      user_index = users.find_index { |u| u[:email] == email }

      if user_index
        users[user_index][:password] = new_password # In production, hash this!
        users[user_index][:updatedAt] = Time.current.iso8601

        render json: {
          success: true,
          message: 'Şifreniz başarıyla güncellendi. Yeni şifrenizle giriş yapabilirsiniz.'
        }
      else
        render json: {
          success: false,
          message: 'Kullanıcı bulunamadı',
          errors: ['User not found']
        }, status: :not_found
      end

    rescue ActionController::ParameterMissing => e
      render json: {
        success: false,
        message: 'Token ve yeni şifre gereklidir',
        errors: [e.message]
      }, status: :bad_request
    rescue => e
      Rails.logger.error "Reset password error: #{e.message}"
      render json: {
        success: false,
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end
end
