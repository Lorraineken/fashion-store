class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.integer :order_id
      t.string :payment_method
      t.string :amount
      t.string :status

      t.timestamps
    end
  end
end
