class Ingredient < ApplicationRecord
  has_many :formulation_ingredients

  validates_presence_of :name, :maximum_percentage, :minimum_percentage
  validates_uniqueness_of :name, :case_sensitive => false
  validates_numericality_of :minimum_percentage, :less_than_or_equal_to => 100, :greater_than_or_equal_to => 0
  validates_numericality_of :maximum_percentage, :less_than_or_equal_to => 100, :greater_than_or_equal_to => 0
  validate :min_max_validity

  private

  def min_max_validity
    if self.minimum_percentage && self.maximum_percentage && self.maximum_percentage < self.minimum_percentage
      self.errors.add(:maximum_percentage, "must be greater than or equal to minimum_percentage")
    end
  end
end
