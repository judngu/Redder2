class PostSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id, :title, :description, :url
  has_many :comments
end
