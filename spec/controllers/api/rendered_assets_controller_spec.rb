require 'rails_helper'

RSpec.describe Api::RenderedAssetsController, type: :controller do
  let(:json) { JSON.parse(response.body) }
  let(:rendered_asset) { create(:rendered_asset, specimen_id: specimen.id) }
  let(:specimen) { create(:specimen) }

  describe '#create' do
    it 'succeeds' do
      post :create, { specimen_id: specimen.id }
      expect(response.status).to eq 200
    end

    it 'has status updating' do
      post :create, { specimen_id: specimen.id }
      expect(json['status']).to eq('uploading')
    end
  end

  describe '#update' do
    it 'succeeds' do
      put :update, { id: rendered_asset.id, status: 'uploaded', uri: 'uri' }
      expect(response.status).to eq 200
    end
  end

  describe '#show' do
    it 'succeeds' do
      get :show, id: rendered_asset.id
      expect(response.status).to eq 200
    end
  end
end
