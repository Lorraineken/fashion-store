class CommentSerializer < ActiveModel::Serializer
  attributes :id, :reviews, :rating, :user_id, :product_id
end
