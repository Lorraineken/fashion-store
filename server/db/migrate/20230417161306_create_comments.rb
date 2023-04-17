class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :reviews
      t.int :rating
      t.int :user_id, null:false
      t.int :product_id, null:false

      t.timestamps
    end
  end
end
