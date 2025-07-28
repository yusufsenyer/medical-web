class Api::V1::OrdersController < ApplicationController
  def index
    # Simulate getting all orders with detailed information
    orders = [
      {
        id: 1,
        customerName: "John Doe",
        email: "john@example.com",
        phone: "+90 555 123 4567",
        profession: "İş İnsanı",
        websiteType: "E-commerce",
        siteName: "John's Store",
        targetAudience: "Online alışveriş yapanlar",
        purpose: "Ürünlerimi online satmak istiyorum",
        colorPalette: "blue",
        selectedPages: ["home", "products", "about", "contact"],
        selectedFeatures: [
          {"id": "responsive-design", "name": "Responsive Tasarım", "price": 0},
          {"id": "seo-optimization", "name": "SEO Optimizasyonu", "price": 500},
          {"id": "contact-form", "name": "İletişim Formu", "price": 200}
        ],
        basePrice: 1500,
        totalPrice: 2200,
        specialRequests: "Modern ve kullanıcı dostu bir tasarım istiyorum. Ürün kategorileri net bir şekilde ayrılsın.",
        deliveryDays: 14,
        status: "completed",
        createdAt: "2025-01-15T10:30:00Z",
        updatedAt: "2025-01-20T16:20:00Z"
      },
      {
        id: 2,
        customerName: "Jane Smith",
        email: "jane@example.com",
        phone: "+90 555 987 6543",
        profession: "Fotoğrafçı",
        websiteType: "Portfolio",
        siteName: "Jane Photography",
        targetAudience: "Düğün çiftleri ve aileler",
        purpose: "Fotoğraf portföyümü sergilemek ve müşteri bulmak",
        colorPalette: "elegant",
        selectedPages: ["home", "portfolio", "about", "contact"],
        selectedFeatures: [
          {"id": "responsive-design", "name": "Responsive Tasarım", "price": 0},
          {"id": "gallery", "name": "Fotoğraf Galerisi", "price": 300}
        ],
        basePrice: 800,
        totalPrice: 1100,
        specialRequests: "Fotoğraflarım ön planda olsun. Şık ve minimal bir tasarım tercih ediyorum.",
        deliveryDays: 7,
        status: "in-progress",
        createdAt: "2025-01-20T14:15:00Z",
        updatedAt: "2025-01-25T09:30:00Z"
      },
      {
        id: 3,
        customerName: "Mike Johnson",
        email: "mike@example.com",
        phone: "+90 555 456 7890",
        profession: "Avukat",
        websiteType: "Business",
        siteName: "Johnson Law Firm",
        targetAudience: "Hukuki danışmanlık arayanlar",
        purpose: "Hukuk büromu tanıtmak ve müvekkil bulmak",
        colorPalette: "professional",
        selectedPages: ["home", "services", "about", "contact"],
        selectedFeatures: [
          {"id": "responsive-design", "name": "Responsive Tasarım", "price": 0},
          {"id": "seo-optimization", "name": "SEO Optimizasyonu", "price": 500},
          {"id": "analytics", "name": "Google Analytics", "price": 100}
        ],
        basePrice: 1200,
        totalPrice: 1800,
        specialRequests: "Güvenilir ve profesyonel görünüm önemli. Hizmetlerim net bir şekilde açıklansın.",
        deliveryDays: 10,
        status: "pending",
        createdAt: "2025-01-25T09:45:00Z",
        updatedAt: "2025-01-25T09:45:00Z"
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
