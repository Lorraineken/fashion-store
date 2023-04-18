class Order < ApplicationRecord
  enum :status, [:pending, :completed, :cancelled]
  belongs_to :user
  belongs_to :product

  has_many :payments
  
end
