class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.string :role, default: 'user'
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
