class Patient < ApplicationRecord
  has_many :patient_formulation_ingredients, :dependent => :destroy
  accepts_nested_attributes_for :patient_formulation_ingredients

  validates_presence_of :name, :dob
end
