class CreateScans < ActiveRecord::Migration
  def change
    create_table :scans do |t|
      t.belongs_to :specimen_id
      t.string :preview_uri
      t.text :images
      t.timestamps null: false
    end
  end
end
