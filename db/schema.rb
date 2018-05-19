# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_19_000005) do

  create_table "formulation_ingredients", force: :cascade do |t|
    t.integer "formulation_id"
    t.integer "ingredient_id"
    t.decimal "percentage", precision: 4, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["formulation_id"], name: "index_formulation_ingredients_on_formulation_id"
    t.index ["ingredient_id"], name: "index_formulation_ingredients_on_ingredient_id"
  end

  create_table "formulations", force: :cascade do |t|
    t.string "name", limit: 50
    t.string "description1", limit: 255
    t.string "description2", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name", limit: 50
    t.decimal "minimum_percentage", precision: 4, scale: 2
    t.decimal "maximum_percentage", precision: 4, scale: 2
    t.text "description"
    t.json "classes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patient_formulation_ingredients", force: :cascade do |t|
    t.integer "formulation_id"
    t.integer "ingredient_id"
    t.integer "patient_id"
    t.decimal "percentage", precision: 4, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["formulation_id"], name: "index_patient_formulation_ingredients_on_formulation_id"
    t.index ["ingredient_id"], name: "index_patient_formulation_ingredients_on_ingredient_id"
    t.index ["patient_id"], name: "index_patient_formulation_ingredients_on_patient_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "name", limit: 50
    t.string "address", limit: 255
    t.date "dob"
  end

end
