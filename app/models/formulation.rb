class Formulation < ApplicationRecord
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false

  def self.search(params)
    scope = self.all.order(:name => :asc)

    params.each do |k, v|
      key = k.to_s
      value = v

      case key
      when "term"
        if value.present?
          term = "%#{value}%"
          scope = scope.where("name #{like_operator} ?", term)
        end
      end
    end

    scope
  end
end
