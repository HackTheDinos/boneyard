class CreateRenderedAssets < ActiveRecord::Migration
  def change
    create_table :rendered_assets do |t|
      t.belongs_to :specimen
      t.string :uri
      t.string :name
      t.string :type
      t.timestamps null: false
    end
  end
end
