class CreatePatients < ActiveRecord::Migration[5.0]
  def change
    create_table :patients do |t|
      t.string :name, :limit => 50
      t.string :address, :limit => 255
      t.date :dob
    end
  end
end
