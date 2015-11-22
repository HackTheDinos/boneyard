class Api::ScansController < Api::BaseController
  before_action :set_scan, only: [:show, :update]
  before_action :set_specimen, only: [:create]

  def show
    render json: @scan
  end

  def update
    success = Scan.update_attributes(update_params)
    return render_validation_errors(@scan) unless success
    render json: @scan
  end

  def create
    @scan = Scan.create(create_params)
    return render_validation_errors(@scan) unless @scan.valid?
    render json: @scan
  end

  private

  def set_scan
    @scan = Scan.find_by(id: params[:id])
    render_not_found unless @scan
  end

  def set_specimen
    @specimen = Specimen.find_by(id: params[:specimen_id])
  end

  def update_params
    params.permit(:status).merge(specimen: @specimen)
  end

  def create_params
    params.permit(:images, :preview_uri)
  end
end
