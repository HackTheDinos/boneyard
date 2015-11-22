class CreateScans < ActiveRecord::Migration
  def change
    create_table :scans do |t|
      t.belongs_to :specimen, null: false
      t.string :preview_uri
      t.text :images
      t.string :status, null: false, default: 'uploading'
      t.timestamps null: false
    end
  end
end
