class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.integer :order_id
      t.string :method
      t.string :amount

      t.timestamps
    end
  end
end
