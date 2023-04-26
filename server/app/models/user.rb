class User < ApplicationRecord
    has_secure_password
# Edit Br
    has_many :user_roles
    has_many :roles, through: :user_roles
    # Edit by Barsu
    has_many :reviews

    validates :username, {
        presence: true,
        length: {minimum:4} 
    }
    validates :email, {
        presence: true,
        length: {minimum:6}
    }
    validates :password, {
        presence: true,
        length: {minimum:4}
    }
end
