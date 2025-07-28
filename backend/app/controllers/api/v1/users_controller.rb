class Api::V1::UsersController < ApplicationController
  def index
    # Simulate getting all users (admin only)
    users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        email: "john@example.com",
        role: "user",
        isActive: true,
        createdAt: "2025-01-10T08:30:00Z",
        lastLogin: "2025-01-28T10:15:00Z"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        fullName: "Jane Smith",
        email: "jane@example.com",
        role: "admin",
        isActive: true,
        createdAt: "2025-01-05T12:20:00Z",
        lastLogin: "2025-01-28T09:45:00Z"
      },
      {
        id: 3,
        firstName: "Mike",
        lastName: "Johnson",
        fullName: "Mike Johnson",
        email: "mike@example.com",
        role: "user",
        isActive: false,
        createdAt: "2025-01-20T16:10:00Z",
        lastLogin: "2025-01-25T14:30:00Z"
      }
    ]
    
    # Apply search filter if provided
    search = params[:search]
    if search.present?
      users = users.select do |user|
        user[:fullName].downcase.include?(search.downcase) ||
        user[:email].downcase.include?(search.downcase)
      end
    end
    
    # Apply pagination
    page = (params[:page] || 1).to_i
    limit = (params[:limit] || 10).to_i
    start_index = (page - 1) * limit
    end_index = start_index + limit - 1
    
    paginated_users = users[start_index..end_index] || []
    
    render json: {
      success: true,
      data: paginated_users,
      pagination: {
        page: page,
        limit: limit,
        total: users.length,
        totalPages: (users.length.to_f / limit).ceil
      }
    }
  end

  def show
    user_id = params[:id].to_i
    
    # Simulate getting a specific user
    user = {
      id: user_id,
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      company: "Tech Corp",
      bio: "Software developer with 5 years of experience",
      role: "user",
      isActive: true,
      createdAt: "2025-01-10T08:30:00Z",
      updatedAt: "2025-01-28T10:15:00Z",
      lastLogin: "2025-01-28T10:15:00Z",
      orderCount: 3,
      totalSpent: 4500
    }
    
    render json: {
      success: true,
      data: user
    }
  end

  def update_status
    user_id = params[:id].to_i
    status_params = params.require(:user).permit(:isActive)
    
    # Simulate user status update
    updated_user = {
      id: user_id,
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      email: "john@example.com",
      role: "user",
      isActive: status_params[:isActive],
      updatedAt: Time.current.iso8601
    }
    
    render json: {
      success: true,
      message: 'User status updated successfully',
      data: updated_user
    }
  rescue ActionController::ParameterMissing => e
    render json: {
      success: false,
      message: 'Missing required parameters',
      errors: [e.message]
    }, status: :bad_request
  rescue => e
    render json: {
      success: false,
      message: 'User status update failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end

  def update_role
    user_id = params[:id].to_i
    role_params = params.require(:user).permit(:role)
    
    # Simulate user role update
    updated_user = {
      id: user_id,
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      email: "john@example.com",
      role: role_params[:role],
      isActive: true,
      updatedAt: Time.current.iso8601
    }
    
    render json: {
      success: true,
      message: 'User role updated successfully',
      data: updated_user
    }
  rescue ActionController::ParameterMissing => e
    render json: {
      success: false,
      message: 'Missing required parameters',
      errors: [e.message]
    }, status: :bad_request
  rescue => e
    render json: {
      success: false,
      message: 'User role update failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end
end
