class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.int :category_id, null:false
      t.float :price, null:false
      t.int :items, null:false
      t.text :description

      t.timestamps
    end
  end
end
