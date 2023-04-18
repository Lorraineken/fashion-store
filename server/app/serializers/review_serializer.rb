class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comments, :rating
  belongs_to :user
  belongs_to :product
end
