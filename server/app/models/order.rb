class Order < ApplicationRecord
  enum :status, [:pending, :completed, :cancelled]
  belongs_to :users

  has_many :payments

  validates :quality, {
              presence: true,
            }
end
