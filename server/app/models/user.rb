class User < ApplicationRecord
    has_secure_password

    has_many :user_roles
    has_many :roles, through: :user_roles
    has_many :reviews

    validates :username, {
        presence: true,
        length: {minimum:4, maximum:10} 
    }
    validates :email, {
        presence: true,
        length: {minimum:6, maximum:20}
    }
    validates :password, {
        presence: true,
        length: {minimum:4, maximum:20}
    }
end
