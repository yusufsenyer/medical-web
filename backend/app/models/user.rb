class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, presence: true, length: { minimum: 6 }

  before_save :set_default_role
  before_save :set_full_name
  before_save :downcase_email

  # Virtual attribute for full name
  def full_name
    "#{first_name} #{last_name}".strip
  end

  # Check if user is admin
  def admin?
    role == 'admin'
  end

  # Update last login time
  def update_last_login!
    update!(last_login: Time.current)
  end

  private

  def set_default_role
    self.role ||= 'user'
  end

  def set_full_name
    # This is handled by the full_name method
  end

  def downcase_email
    self.email = self.email.to_s.strip.downcase
  end
end
