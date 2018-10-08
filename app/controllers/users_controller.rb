class UsersController < ApplicationController

  skip_before_action :verify_authenticity_token


  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to WhoMap #{@user.username}!"
      redirect_to root_path
    else
      render 'new'
    end
  end

  def index
    @user = current_user
    @users = User.all
  end

  def update_current_user_location
    current_user.longitude = params[:longitude]
    current_user.latitude = params[:latitude]
    current_user.save

    respond_to do |format|
      format.json { render :json => {:message => "success"} }
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
