# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
post1 = Post.create(title: 'post1', description: 'this is a post', url: 'judynguyen.me')
post2 = Post.create(title: 'post2', description: 'this is a post', url: 'judynguyen.me')
post3 = Post.create(title: 'post3', description: 'this is a post', url: 'judynguyen.me')

post1.comments.create(body: 'this is a great post1')
post1.comments.create(body: 'this is a great post2')
post1.comments.create(body: 'this is a great post3')

post2.comments.create(body: 'this is a great post1')

post3.comments.create(body: 'this is a great post1')
post3.comments.create(body: 'this is a great post2')
post3.comments.create(body: 'this is a great post3')
post3.comments.create(body: 'this is a great post4')
post3.comments.create(body: 'this is a great post5')
post3.comments.create(body: 'this is a great post6')
