class CreateEmployees < ActiveRecord::Migration[7.2]
  def change
    create_table :employees do |t|
      t.text :name
      t.text :last_name
      t.text :position
      t.decimal :salary

      t.timestamps
    end
  end
end
