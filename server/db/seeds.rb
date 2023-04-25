# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"

puts "Creating seed data..."

# Create some categories
Category.create!(name: "Shirts")
Category.create!(name: "Pants")
Category.create!(name: "Shoes")
Category.create!(name: "Dresses")

# Create some roles
Role.create!(name: "admin")
Role.create!(name: "customer")

# Create some users
10.times do
 username = Faker::Internet.username
  until username.length >= 4
    username = Faker::Internet.username
  end

  User.create!(
    username: username,
    email: Faker::Internet.email,
    password: "password",
  )
end

# Assign roles to users
 User.all.each do |user|
  user.roles << Role.find_by(name: "customer")
end

admin = User.create(username: "admin", email: "admin@example.com", password: "password")
admin.roles << Role.find_by(name: "admin")

# Create some products
categories = Category.all
10.times do
  product = Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10..100.0),
    image_url: Faker::LoremFlickr.image(size: "300x300"),
    description: Faker::Lorem.paragraph,
    gender: ["male", "female"].sample,
    category_id: categories.sample.id
  )
end

#create orders
order1 = Order.create(total_amount: 31.98, status: "pending", address: "123 Main St.")
order2 = Order.create(total_amount: 41.98, status: "shipped", address: "456 Elm St.")


 
# Create some payments
Order.all.each do |order|
  Payment.create!(
    order_id: order.id,
    payment_method: ["credit card", "paypal", "cash"].sample,
    amount: order.total_amount,
    status: ["paid", "pending", "failed"].sample,
  )
end

# Create some reviews
User.all.each do |user|
  3.times do
    product = Product.all.sample
    Review.create!(
      comments: Faker::Lorem.sentence,
      rating: rand(1..5),
      user_id: user.id,
      product_id: product.id,
    )
  end
end
puts "Done seeding!"
