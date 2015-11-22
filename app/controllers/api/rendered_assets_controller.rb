class Api::RenderedAssetsController < Api::BaseController
  before_action :set_rendered_asset, only: [:show, :update]
  before_action :set_specimen, only: [:create]

  def show
    render json: @rendered_asset
  end

  def create
    @rendered_asset = RenderedAsset.create(create_params)
    return render_validation_errors(@rendered_asset) unless @rendered_asset.valid?
    render json: @rendered_asset
  end

  def update
    success = @rendered_asset.update_attributes(update_params)
    render json: @rendered_asset
  end

  private

  def set_rendered_asset
    @rendered_asset = RenderedAsset.find_by(id: params[:id])
    render_not_found unless @rendered_asset
  end

  def set_specimen
    @specimen = Specimen.find_by(id: params[:specimen_id])
  end

  def create_params
    params.permit(:uri, :name).merge(specimen: @specimen)
  end

  def update_params
    params.permit(:status, :uri, :name)
  end
end
