class Review < ApplicationRecord
    belongs_to :user
    belongs_to :product

    validates :rating, {
        presence: true
    }
    validates :comments, {
        length: {minimum:4, maximum:20}
    }
end
