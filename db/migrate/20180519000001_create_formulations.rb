class CreateFormulations < ActiveRecord::Migration[5.0]
  def change
    create_table :formulations do |t|
      t.string :name, :limit => 50
      t.string :description1, :limit => 255
      t.string :description2, :limit => 255

      t.timestamps
    end
  end
end
