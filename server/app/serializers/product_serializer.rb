class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :category_id, :price, :items, :description
end
