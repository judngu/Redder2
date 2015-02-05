class Api::CommentsController < ApplicationController
  def index
    render json: Comment.all
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment
    else
      render json: { errors: @comment.errors }
    end
  end

  def show
    render json: Comment.find(params[:id])
  end

  protected

  def comment_params
    params.require(:comment).permit(:body, :post_id)
  end
end
