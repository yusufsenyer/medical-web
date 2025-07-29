class Api::V1::AuthController < ApplicationController
  # Create admin user if not exists
  def self.ensure_admin_user
    admin_email = 'admin123@gmail.com'
    unless User.exists?(email: admin_email)
      User.create!(
        first_name: 'Admin',
        last_name: 'User',
        email: admin_email,
        password: 'admin123',
        role: 'admin',
        is_active: true
      )
    end
  end
  def register
    user_params = params.require(:user).permit(:firstName, :lastName, :email, :password)

    begin
      # Create user with database
      user = User.new(
        first_name: user_params[:firstName],
        last_name: user_params[:lastName],
        email: user_params[:email],
        password: user_params[:password],
        role: 'user',
        is_active: true,
        last_login: Time.current
      )

      if user.save
        # Generate fake JWT token
        token = "fake_jwt_token_#{rand(100000..999999)}"

        render json: {
          success: true,
          message: 'Kullanıcı başarıyla kaydedildi',
          data: {
            user: {
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              fullName: user.full_name,
              email: user.email,
              role: user.role,
              phone: user.phone,
              company: user.company,
              bio: user.bio,
              isActive: user.is_active,
              createdAt: user.created_at.iso8601,
              lastLogin: user.last_login&.iso8601
            },
            token: token
          }
        }, status: :created
      else
        render json: {
          success: false,
          message: 'Kayıt sırasında hata oluştu',
          errors: user.errors.full_messages
        }, status: :unprocessable_entity
      end

    rescue ActiveRecord::RecordNotUnique
      render json: {
        success: false,
        message: 'Bu e-posta adresi zaten kullanılıyor',
        errors: ['Email already exists']
      }, status: :unprocessable_entity
    rescue => e
      render json: {
        success: false,
        message: 'Kayıt sırasında bir hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
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
      # Ensure admin user exists
      self.class.ensure_admin_user

      # Find user by email
      user = User.find_by(email: user_params[:email])

      if user && user.password == user_params[:password] && user.is_active
        # Update last login
        user.update_last_login!

        # Generate fake JWT token
        token = "fake_jwt_token_#{rand(100000..999999)}"

        render json: {
          success: true,
          message: 'Giriş başarılı',
          data: {
            user: {
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              fullName: user.full_name,
              email: user.email,
              role: user.role,
              phone: user.phone,
              company: user.company,
              bio: user.bio,
              isActive: user.is_active,
              createdAt: user.created_at.iso8601,
              lastLogin: user.last_login&.iso8601
            },
            token: token
          }
        }
      else
        render json: {
          success: false,
          message: 'Geçersiz e-posta veya şifre',
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
    # In a real app, get user_id from JWT token
    user_id = params[:user_id] || 1 # Fallback for testing

    begin
      user = User.find(user_id)

      render json: {
        success: true,
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          company: user.company,
          bio: user.bio,
          isActive: user.is_active,
          createdAt: user.created_at.iso8601,
          lastLogin: user.last_login&.iso8601
        }
      }
    rescue ActiveRecord::RecordNotFound
      render json: {
        success: false,
        message: 'Kullanıcı bulunamadı',
        errors: ['User not found']
      }, status: :not_found
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
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            fullName: user.full_name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            company: user.company,
            bio: user.bio,
            isActive: user.is_active,
            createdAt: user.created_at.iso8601,
            lastLogin: user.last_login&.iso8601,
            updatedAt: user.updated_at.iso8601
          }
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
      }, status: :internal_server_error
    end
  end
end
