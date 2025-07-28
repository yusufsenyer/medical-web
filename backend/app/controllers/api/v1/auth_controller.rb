class Api::V1::AuthController < ApplicationController
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

      token = "fake_jwt_token_#{rand(100000..999999)}"

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
end
