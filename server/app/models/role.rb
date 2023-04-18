class Role < ApplicationRecord
    has_many :user_roles
    has_many :users, through: :user_roles

    validates :name, {
     inclusion: { in: %w(customer staff admin)},
     presence: true
    }
end
