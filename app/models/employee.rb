# == Schema Information
#
# Table name: employees
#
#  id         :integer          not null, primary key
#  last_name  :text
#  name       :text
#  position   :text
#  salary     :decimal(, )
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Employee < ApplicationRecord
end
