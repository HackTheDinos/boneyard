class AddUniqueKeyToInstitutionalId < ActiveRecord::Migration
  def change
    add_index :specimens, :institutional_id, unique: true
  end
end
