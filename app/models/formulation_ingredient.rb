class FormulationIngredient < ApplicationRecord
  belongs_to :formulation
  belongs_to :ingredient

  validates_presence_of :formulation, :ingredient, :percentage
  validates_uniqueness_of :formulation_id, :scope => :ingredient_id
  validates_numericality_of :percentage, :less_than_or_equal_to => 100, :greater_than_or_equal_to => 0
  validate :percentage_must_be_in_range

  def self.search(params)
    scope = self.all

    params.each do |k, v|
      key = k.to_s
      value = v

      case key
      when "formulation_id"
        if value.present?
          scope = scope.where(:formulation_id => value)
        end
      end
    end

    scope
  end

  private

  def percentage_must_be_in_range
    if self.ingredient && self.percentage
      min = self.ingredient.minimum_percentage
      max = self.ingredient.maximum_percentage

      if self.percentage < min || self.percentage > max
        self.errors.add(:percentage, "must be between #{min} and #{max}")
      end
    end
  end
end
