class Order < ApplicationRecord
  enum :status, [:pending, :completed, :cancelled]
  belongs_to :user

  has_many :payments
  has_many :products, through: :order_products

  validates :quality, {
              presence: true,
            }
end
