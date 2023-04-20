class ReviewsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index,:show]

    rescue_from ActiveRecord::RecordNotFound, with: :review_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

    def create 
        review = Review.create!(reviews_params)
        if review.valid? 
            render json: review, status: :created
        else 
            render json:{error:"Invalid review detail"}, status: :unprocessable_entity
    
        end
       end
    
       def index 
        review =Review.all 
        render json: review, status: :ok
       end
    
       def show 
        review = Review.find(params[:id])
        render json: review, status: :ok
       end
    
       def update 
        review =Review.find(params[:id])
        review.update!(reviews_params)
        render json: review, status: :accepted
       end

       def destroy 
        review =Review.find(params[:id])
        review.destroy 
        head :no_content
       end
    
       private
    
       def comment_params 
        params.permit(:comments,:rating,:product_id)
       end
    
       def review_record_missing 
        render json: { "error": "Review not found"}, status: :not_found
       end
    
       def validation_error 
        render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
       end

end
