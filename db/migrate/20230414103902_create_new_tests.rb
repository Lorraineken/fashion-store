class CreateNewTests < ActiveRecord::Migration[6.1]
  def change
    create_table :new_tests do |t|
      t.string :name

      t.timestamps
    end
  end
end
