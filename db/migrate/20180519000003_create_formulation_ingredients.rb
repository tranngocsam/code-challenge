class CreateFormulationIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :formulation_ingredients do |t|
      t.belongs_to :formulation
      t.belongs_to :ingredient
      t.decimal :percentage, :precision => 4, :scale => 2

      t.timestamps
    end
  end
end
