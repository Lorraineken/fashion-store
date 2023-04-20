class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :category_id
  has_many :reviews
end
