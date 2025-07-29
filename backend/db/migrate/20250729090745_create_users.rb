class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :role
      t.string :phone
      t.string :company
      t.text :bio
      t.boolean :is_active, default: true
      t.datetime :last_login

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
