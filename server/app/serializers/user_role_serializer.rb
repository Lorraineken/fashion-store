class UserRoleSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user
  belongs_to :role
end
