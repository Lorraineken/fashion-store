class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :items, :description
  belongs_to :category
  has_many :reviews
end
