class Api::V1::OrdersController < ApplicationController
  # Class variable to store orders in memory (in a real app, use database)
  @@created_orders = []
  def index
    # Get all created orders from memory (in a real app, this would be from database)
    @@created_orders ||= []
    orders = @@created_orders

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
      :customerName, :customer_name, :customer_email, :customer_phone, :website_name, :website_type,
      :email, :phone, :websiteType, :siteName,
      :description, :totalPrice, :total_price, :basePrice, :base_price, :profession, :targetAudience, :target_audience,
      :purpose, :colorPalette, :color_palette, :specialRequests, :special_requests, :knowledge_text, :notes, :deliveryDays, :delivery_days,
      features: [], pages: [], selectedFeatures: [], selected_features: [], selectedPages: [], selected_pages: [],
      designPreferences: {}
    )

    # Create new order and store in memory
    new_order = {
      id: rand(1000..9999),
      customerName: order_params[:customerName] || order_params[:customer_name],
      email: order_params[:email] || order_params[:customer_email],
      phone: order_params[:phone] || order_params[:customer_phone] || "",
      profession: order_params[:profession] || "",
      websiteType: order_params[:websiteType] || order_params[:website_type],
      siteName: order_params[:siteName] || order_params[:website_name] || "",
      targetAudience: order_params[:targetAudience] || order_params[:target_audience] || "",
      purpose: order_params[:purpose] || "",
      colorPalette: order_params[:colorPalette] || order_params[:color_palette] || "",
      selectedPages: order_params[:selectedPages] || order_params[:selected_pages] || order_params[:pages] || [],
      selectedFeatures: order_params[:selectedFeatures] || order_params[:selected_features] || order_params[:features] || [],
      basePrice: order_params[:basePrice] || order_params[:base_price] || order_params[:totalPrice] || order_params[:total_price] || 1000,
      totalPrice: order_params[:totalPrice] || order_params[:total_price] || 1000,
      specialRequests: order_params[:specialRequests] || order_params[:special_requests] || order_params[:knowledge_text] || order_params[:notes] || "",
      deliveryDays: order_params[:deliveryDays] || order_params[:delivery_days] || 7,
      status: "pending",
      createdAt: Time.current.iso8601,
      updatedAt: Time.current.iso8601,
      designPreferences: order_params[:designPreferences] || {}
    }

    # Store in class variable (in real app, save to database)
    @@created_orders ||= []
    @@created_orders << new_order

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
