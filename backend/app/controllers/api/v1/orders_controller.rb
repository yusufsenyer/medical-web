class Api::V1::OrdersController < ApplicationController
  def index
    # Simulate getting all orders
    orders = [
      {
        id: 1,
        customerName: "John Doe",
        email: "john@example.com",
        websiteType: "E-commerce",
        status: "completed",
        totalPrice: 1500,
        createdAt: "2025-01-15T10:30:00Z",
        features: ["responsive-design", "seo-optimization", "contact-form"]
      },
      {
        id: 2,
        customerName: "Jane Smith",
        email: "jane@example.com",
        websiteType: "Portfolio",
        status: "in-progress",
        totalPrice: 800,
        createdAt: "2025-01-20T14:15:00Z",
        features: ["responsive-design", "gallery"]
      },
      {
        id: 3,
        customerName: "Mike Johnson",
        email: "mike@example.com",
        websiteType: "Business",
        status: "pending",
        totalPrice: 1200,
        createdAt: "2025-01-25T09:45:00Z",
        features: ["responsive-design", "seo-optimization", "analytics"]
      }
    ]
    
    render json: {
      success: true,
      data: orders,
      total: orders.length
    }
  end

  def show
    order_id = params[:id].to_i
    
    # Simulate getting a specific order
    order = {
      id: order_id,
      customerName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      websiteType: "E-commerce",
      status: "completed",
      totalPrice: 1500,
      createdAt: "2025-01-15T10:30:00Z",
      updatedAt: "2025-01-20T16:20:00Z",
      features: ["responsive-design", "seo-optimization", "contact-form"],
      websiteDetails: {
        siteName: "My Awesome Store",
        description: "An e-commerce website for selling products",
        pages: ["Home", "Products", "About", "Contact"],
        colorScheme: "blue-modern"
      },
      designPreferences: {
        style: "modern",
        colors: ["#007bff", "#ffffff", "#f8f9fa"],
        layout: "grid"
      }
    }
    
    render json: {
      success: true,
      data: order
    }
  end

  def create
    order_params = params.require(:order).permit(
      :customerName, :email, :phone, :websiteType, :siteName, 
      :description, :totalPrice, features: [], pages: [], 
      designPreferences: {}
    )
    
    # Simulate order creation
    new_order = {
      id: rand(1000..9999),
      customerName: order_params[:customerName],
      email: order_params[:email],
      phone: order_params[:phone],
      websiteType: order_params[:websiteType],
      siteName: order_params[:siteName],
      description: order_params[:description],
      status: "pending",
      totalPrice: order_params[:totalPrice] || 1000,
      createdAt: Time.current.iso8601,
      updatedAt: Time.current.iso8601,
      features: order_params[:features] || [],
      pages: order_params[:pages] || [],
      designPreferences: order_params[:designPreferences] || {}
    }
    
    render json: {
      success: true,
      message: 'Order created successfully',
      data: new_order
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
      message: 'Order creation failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end

  def update
    order_id = params[:id].to_i
    order_params = params.require(:order).permit(
      :status, :customerName, :email, :phone, :websiteType, 
      :totalPrice, features: [], designPreferences: {}
    )
    
    # Simulate order update
    updated_order = {
      id: order_id,
      customerName: order_params[:customerName] || "John Doe",
      email: order_params[:email] || "john@example.com",
      phone: order_params[:phone] || "+1234567890",
      websiteType: order_params[:websiteType] || "E-commerce",
      status: order_params[:status] || "in-progress",
      totalPrice: order_params[:totalPrice] || 1500,
      createdAt: "2025-01-15T10:30:00Z",
      updatedAt: Time.current.iso8601,
      features: order_params[:features] || ["responsive-design"],
      designPreferences: order_params[:designPreferences] || {}
    }
    
    render json: {
      success: true,
      message: 'Order updated successfully',
      data: updated_order
    }
  rescue => e
    render json: {
      success: false,
      message: 'Order update failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end

  def destroy
    order_id = params[:id].to_i
    
    render json: {
      success: true,
      message: "Order ##{order_id} deleted successfully"
    }
  rescue => e
    render json: {
      success: false,
      message: 'Order deletion failed',
      errors: [e.message]
    }, status: :unprocessable_entity
  end
end
