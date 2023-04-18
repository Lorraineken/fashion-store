# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Created seed data..."

# Create some users
user1 = User.create!(name: "John Doe", email: "john@example.com", password: "password")
user2 = User.create!(name: "Jane Smith", email: "jane@example.com", password: "password")

# Create some products
product1 = Product.create!(name: "Product 1", price: 10.0)
product2 = Product.create!(name: "Product 2", price: 20.0)

# Create some orders
order1 = Order.create!(user: user1, product: product1, total_amount: 10.0, status: "completed", address: "123 Main St")
order2 = Order.create!(user: user2, product: product2, total_amount: 20.0, status: "pending", address: "456 Elm St")

# Create some payment methods
payment1 = Payment.create!(order: order1, payment_method: "credit card", amount: 10.0, status: "paid")
payment2 = Payment.create!(order: order2, payment_method: "PayPal", amount: 20.0, status: "failed")

puts "Done seeding!"