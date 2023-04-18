class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :comments
      t.int :rating, null:false
      t.int :user_id, null:false
      t.int :product_id, null:false

      t.timestamps
    end
  end
end
