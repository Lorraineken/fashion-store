class Review < ApplicationRecord
    belongs_to :user
    belongs_to :product

    validates :rating, {
        presence: true
    }
    validates :comments, {
        length: {maximum:20}
    }
end
