class SpecimensController < ApplicationController
  def index
    render json: [{ id: 1, name: 'Zanabazar' }]
  end
end
