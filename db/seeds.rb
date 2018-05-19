require "csv"

folder_path = "#{Rails.root.to_s}/db/fixtures"
file_name = "formulations.csv"
csv = File.read("#{folder_path}/#{file_name}")

puts "Importing formulations"
CSV.parse(csv).each_with_index do |row, index|
  next if index == 0

  attrs = {
    name: row[1],
    description1: row[2],
    description2: row[3]
  }

  id = row[0]
  formulation = Formulation.where(:id => id).first ||
                Formulation.where("LOWER(name) = ?", attrs[:name].try(:downcase)).first ||
                Formulation.new

  formulation.assign_attributes(attrs)
  formulation.id = id
  formulation.save!
end

file_name = "ingredients.csv"
csv = File.read("#{folder_path}/#{file_name}")

puts "Importing ingredients"
CSV.parse(csv, :headers => true).each_with_index do |row|
  attrs = row.to_h
  attrs["classes"] = JSON.parse(attrs["classes"]) if attrs["classes"].present?
  id = attrs["id"]

  ingredient = Ingredient.where(:id => id).first ||
               Ingredient.where("LOWER(name) = ?", attrs["name"].try(:downcase)).first ||
               Ingredient.new

  ingredient.assign_attributes(attrs)
  ingredient.id = id
  ingredient.save!
end

file_name = "formulation_ingredients.csv"
csv = File.read("#{folder_path}/#{file_name}")

puts "Importing formulation_ingredients"
CSV.parse(csv, :headers => true).each_with_index do |row|
  attrs = row.to_h

  record = FormulationIngredient.find_or_initialize_by(attrs.slice("formulation_id", "ingredient_id"))
  record.assign_attributes(attrs)
  record.save!
end
