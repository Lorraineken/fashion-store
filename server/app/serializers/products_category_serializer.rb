class ProductsCategorySerializer < ActiveModel::Serializer
  attributes :id
  has_one :product
  has_one :category
end
