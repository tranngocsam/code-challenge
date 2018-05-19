class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.like_operator
    if ActiveRecord::Base.configurations[Rails.env]['adapter'].downcase == "postgresql"
      "ILIKE"
    else
      "LIKE"
    end
  end
end
