class PasswordResetService
  # In-memory storage for reset tokens (in production, use Redis or database)
  @@reset_tokens = {}
  
  def self.generate_reset_token(email)
    # Generate secure random token
    token = SecureRandom.urlsafe_base64(32)
    
    # Store token with expiration (1 hour)
    @@reset_tokens[token] = {
      email: email,
      expires_at: 1.hour.from_now,
      created_at: Time.current
    }
    
    # Clean up expired tokens
    cleanup_expired_tokens
    
    token
  end
  
  def self.validate_reset_token(token)
    return false unless token.present?
    
    token_data = @@reset_tokens[token]
    return false unless token_data
    
    # Check if token is expired
    if token_data[:expires_at] < Time.current
      @@reset_tokens.delete(token)
      return false
    end
    
    token_data[:email]
  end
  
  def self.consume_reset_token(token)
    email = validate_reset_token(token)
    if email
      @@reset_tokens.delete(token)
      email
    else
      false
    end
  end
  
  def self.cleanup_expired_tokens
    @@reset_tokens.delete_if { |token, data| data[:expires_at] < Time.current }
  end
  
  def self.get_all_tokens
    @@reset_tokens
  end
end
