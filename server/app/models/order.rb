class Order < ApplicationRecord
  # enum :status, [:pending, :shipped, :delivered]
  belongs_to :user
  
  has_many :order_products
  has_many :payments
end
