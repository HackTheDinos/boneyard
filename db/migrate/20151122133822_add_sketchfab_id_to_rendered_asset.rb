class AddSketchfabIdToRenderedAsset < ActiveRecord::Migration
  def change
    add_column :rendered_assets, :sketchfab_id, :string
  end
end
