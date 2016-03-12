class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.text :responses

      t.timestamps null: false
    end
  end
end
