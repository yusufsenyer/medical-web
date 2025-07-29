class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, presence: true, length: { minimum: 6 }

  before_save :downcase_email

  def full_name
    "#{first_name} #{last_name}"
  end

  def admin?
    role == 'admin'
  end

  def user?
    role == 'user'
  end

  def update_last_login!
    update!(last_login: Time.current)
  end

  # JSON serialization için
  def as_json(options = {})
    super(options.merge(except: [:password, :created_at, :updated_at])).merge(
      fullName: full_name,
      createdAt: created_at&.iso8601,
      updatedAt: updated_at&.iso8601,
      lastLogin: last_login&.iso8601
    )
  end

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
