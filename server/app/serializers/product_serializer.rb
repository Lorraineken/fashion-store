class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category_id
  has_many :reviews
end
