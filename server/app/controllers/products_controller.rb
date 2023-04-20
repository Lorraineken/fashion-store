class ProductsController < ApplicationController
    before_action :authorize_admin
    skip_before_action :authorize_admin, only: [:index, :show]

    rescue_from ActiveRecord::RecordNotFound, with: :product_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

  def create
    product = Product.create!(product_params)
    if product.valid?
      render json: product, status: :created
    else
      render json: { error: "Invalid product detail" }, status: :unprocessable_entity
    end
  end

  def index
    product = Product.all
    render json: product, status: :ok
  end

  def show
    product = Product.find(params[:id])
    render json: product, status: :ok
  end

  def update
    product = Product.find(params[:id])
    product.update!(product_params)
    render json: product, status: :accepted
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    head :no_content
  end

  private

  def product_params
    params.permit(:name, :category_id, :price, :description, :image_url, :gender)
  end

  def product_record_missing 
    render json: { "error": "Product not found"}, status: :not_found
  end

   def validation_error 
    render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
   end
end
