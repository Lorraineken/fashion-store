class CommentsController < ApplicationController
    def create 
        comment = Comment.create!(comment_params)
        if comment.valid? 
            render json: comment, status: :created
        else 
            render json:{error:"Invalid comment detail"}, status: :unprocessable_entity
    
        end
       end
    
       def index 
        comment =Comment.all 
        render json: comment, status: :ok
       end
    
       def show 
        comment = Comment.find(params[:id])
        render json: user, status: :ok
       end
    
       def update 
        comment =Comment.find(params[:id])
        comment.update!(comment_params)
        render json: comment, status: :accepted
       end

       def destroy 
        comment =Comment.find(params[:id])
        comment.destroy 
        head :no_content
       end
    
       private
    
       def comment_params 
        params.permit(:reviews,:rating)
       end
    

end
