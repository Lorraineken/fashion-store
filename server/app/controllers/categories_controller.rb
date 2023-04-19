class CategoriesController < ApplicationController
    def create 
        category = Category.create!(category_params)
        if category.valid? 
            render json: category, status: :created
        else 
            render json:{error:"Invalid category detail"}, status: :unprocessable_entity
    
        end
       end
    
       def index 
        category =Category.all 
        render json: category, status: :ok
       end
    
       def show 
        category = Category.find(params[:id])
        render json: category, status: :ok
       end
    
       def update 
        category =Category.find(params[:id])
        category.update!(category_params)
        render json: category, status: :accepted
       end

       def destroy 
        category =Category.find(params[:id])
        category.destroy 
        head :no_content
       end
    
       private
    
       def category_params 
        params.permit(:name)
       end
end
