class CreateRenderedAssets < ActiveRecord::Migration
  def change
    create_table :rendered_assets do |t|
      t.belongs_to :specimen, null: false
      t.string :uri
      t.string :name
      t.string :status, null: false, default: 'uploading'
      t.timestamps null: false
    end
  end
end
