class ProductsCategoriesController < ApplicationController
    before_action :authorize_admin
    skip_before_action :authorize_admin, only: [:index, :show]

    def create 
        procat = ProductsCategory.create!(procat_params)
        if procat.valid? 
            render json: procat, status: :created
        else 
            render json:{error:"Invalid product_category detail"}, status: :unprocessable_entity
    
        end
       end
    
       def index 
        procat =ProductsCategory.all 
        render json: procat, status: :ok
       end
    
       def show 
        procat = ProductsCategory.find(params[:id])
        render json: procat, status: :ok
       end
    
       def update 
        procat =ProductsCategory.find(params[:id])
        procat.update!(procat_params)
        render json: procat, status: :accepted
       end

       def destroy 
        procat =ProductsCategory.find(params[:id])
        procat.destroy 
        head :no_content
       end
    
       private
    
       def procat_params 
        params.permit(:product_id,:category_id)
       end
end
