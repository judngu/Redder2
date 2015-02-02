class Api::PostsController < ApplicationController
  def index
    render json: Post.all
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: { errors: @post.errors }
    end
  end

  def show
    render json: Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: { errors: @post.errors }
    end
  end

  protected

  def post_params
    params.require(:post).permit(:title, :description, :url)
  end
end


