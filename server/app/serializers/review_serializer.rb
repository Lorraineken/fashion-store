class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comments, :rating, :user_id, :product_id
end
