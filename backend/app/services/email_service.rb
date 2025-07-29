require 'sendgrid-ruby'
include SendGrid

class EmailService
  def self.send_password_reset_email(email, reset_token)
    reset_url = "http://localhost:3001/auth/reset-password?token=#{reset_token}"

    data = {
      personalizations: [
        {
          to: [{ email: email }],
          subject: 'Şifre Sıfırlama Talebi'
        }
      ],
      from: {
        email: ENV['SENDGRID_FROM_EMAIL'] || 'yusufsenyer@gmail.com',
        name: 'Website Builder'
      },
      content: [
        {
          type: 'text/html',
          value: generate_password_reset_html(reset_url)
        }
      ]
    }

    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])

    begin
      response = sg.client.mail._('send').post(request_body: data.to_json)

      if response.status_code.to_i >= 200 && response.status_code.to_i < 300
        Rails.logger.info "Password reset email sent successfully to #{email}"
        return { success: true, message: 'Email sent successfully' }
      else
        Rails.logger.error "Failed to send email: #{response.status_code} - #{response.body}"
        return { success: false, message: 'Failed to send email' }
      end
    rescue => e
      Rails.logger.error "Email service error: #{e.message}"
      return { success: false, message: 'Email service error' }
    end
  end
  
  private
  
  def self.generate_password_reset_html(reset_url)
    <<~HTML
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Şifre Sıfırlama</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Şifre Sıfırlama</h1>
          </div>
          <div class="content">
            <h2>Merhaba!</h2>
            <p>Hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz:</p>
            
            <div style="text-align: center;">
              <a href="#{reset_url}" class="button">Şifremi Sıfırla</a>
            </div>
            
            <p><strong>Önemli:</strong> Bu link 1 saat boyunca geçerlidir. Eğer şifre sıfırlama talebinde bulunmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
            
            <p>Link çalışmıyorsa, aşağıdaki adresi tarayıcınıza kopyalayabilirsiniz:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">#{reset_url}</p>
          </div>
          <div class="footer">
            <p>Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.</p>
            <p>&copy; 2025 Website Builder. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </body>
      </html>
    HTML
  end
end
