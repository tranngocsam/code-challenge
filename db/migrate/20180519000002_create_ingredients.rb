class CreateIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :ingredients do |t|
      t.string :name, :limit => 50
      t.decimal :minimum_percentage, :precision => 4, :scale => 2
      t.decimal :maximum_percentage, :precision => 4, :scale => 2
      t.text :description
      t.json :classes

      t.timestamps
    end
  end
end
