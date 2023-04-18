class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.float :price, null:false
      t.text :image_url, null:false
      t.text :description
      t.string :gender, null:false

      t.timestamps
    end
  end
end
