class Api::V1::UsersController < ApplicationController
  def index
    begin
      # Get all users from database
      users_query = User.all

      # Apply search filter if provided
      search = params[:search]
      if search.present?
        users_query = users_query.where(
          "first_name ILIKE ? OR last_name ILIKE ? OR email ILIKE ?",
          "%#{search}%", "%#{search}%", "%#{search}%"
        )
      end

      # Apply pagination
      page = (params[:page] || 1).to_i
      limit = (params[:limit] || 10).to_i

      users = users_query.limit(limit).offset((page - 1) * limit)
      total_count = users_query.count

      # Format users data
      formatted_users = users.map do |user|
        {
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
      end

      render json: {
        success: true,
        data: formatted_users,
        pagination: {
          page: page,
          limit: limit,
          total: total_count,
          totalPages: (total_count.to_f / limit).ceil
        }
      }
    rescue => e
      render json: {
        success: false,
        message: 'Kullanıcılar alınırken hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end

  def show
    begin
      user = User.find(params[:id])

      # Get user's order statistics (when orders are implemented)
      order_count = 0 # Order.where(user_id: user.id).count
      total_spent = 0 # Order.where(user_id: user.id).sum(:total_amount)

      render json: {
        success: true,
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          bio: user.bio,
          role: user.role,
          isActive: user.is_active,
          createdAt: user.created_at.iso8601,
          updatedAt: user.updated_at.iso8601,
          lastLogin: user.last_login&.iso8601,
          orderCount: order_count,
          totalSpent: total_spent
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
        message: 'Kullanıcı bilgileri alınırken hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end

  def update_status
    begin
      user = User.find(params[:id])
      status_params = params.require(:user).permit(:isActive)

      user.update!(is_active: status_params[:isActive])

      render json: {
        success: true,
        message: 'Kullanıcı durumu başarıyla güncellendi',
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          email: user.email,
          role: user.role,
          isActive: user.is_active,
          updatedAt: user.updated_at.iso8601
        }
      }
    rescue ActiveRecord::RecordNotFound
      render json: {
        success: false,
        message: 'Kullanıcı bulunamadı',
        errors: ['User not found']
      }, status: :not_found
    rescue ActionController::ParameterMissing => e
      render json: {
        success: false,
        message: 'Gerekli parametreler eksik',
        errors: [e.message]
      }, status: :bad_request
    rescue => e
      render json: {
        success: false,
        message: 'Kullanıcı durumu güncellenirken hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end

  def update_role
    begin
      user = User.find(params[:id])
      role_params = params.require(:user).permit(:role)

      user.update!(role: role_params[:role])

      render json: {
        success: true,
        message: 'Kullanıcı rolü başarıyla güncellendi',
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          email: user.email,
          role: user.role,
          isActive: user.is_active,
          updatedAt: user.updated_at.iso8601
        }
      }
    rescue ActiveRecord::RecordNotFound
      render json: {
        success: false,
        message: 'Kullanıcı bulunamadı',
        errors: ['User not found']
      }, status: :not_found
    rescue ActionController::ParameterMissing => e
      render json: {
        success: false,
        message: 'Gerekli parametreler eksik',
        errors: [e.message]
      }, status: :bad_request
    rescue => e
      render json: {
        success: false,
        message: 'Kullanıcı rolü güncellenirken hata oluştu',
        errors: [e.message]
      }, status: :internal_server_error
    end
  end
end
