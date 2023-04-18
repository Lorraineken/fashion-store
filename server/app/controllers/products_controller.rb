class ProductsController < ApplicationController
    def create 
        product = Product.create!(comment_params)
        if product.valid? 
            render json: product, status: :created
        else 
            render json:{error:"Invalid product detail"}, status: :unprocessable_entity
    
        end
       end
    
       def index 
        product =Product.all 
        render json: product, status: :ok
       end
    
       def show 
        product = Product.find(params[:id])
        render json: product, status: :ok
       end
    
       def update 
        product =Product.find(params[:id])
        product.update!(product_params)
        render json: product, status: :accepted
       end

       def destroy 
        product =Product.find(params[:id])
        product.destroy 
        head :no_content
       end
    
       private
    
       def product_params 
        params.permit(:name,:category_id,:price,:items,:description)
       end
end
