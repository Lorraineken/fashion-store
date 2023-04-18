class Product < ApplicationRecord
    has_many :reviews
    has_many :products_categories
    has_many :categories, through: :products_categories

    validates :name, {
        presence: true,
        length: {minimum:4}
    }
    validates :price, {
        presence: true,
        numericality: {
            greater_than_or_equal_to: 2
        }
    }
    validates :description, {
        length: {maximum:30}
    }
end
