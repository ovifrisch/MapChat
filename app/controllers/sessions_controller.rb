class SessionsController < Devise::SessionsController
  def new
    super
  end

  def create
    
  end
end







# class SessionsController < ApplicationController
#   def new
#   end
#
#   def create
#     user = User.find_by(username: params[:session][:username].downcase)
#     if (user && user.authenticate(params[:session][:password]))
#       session[:user_id] = user.id
#       cookies[:user_id] = user.id
#       flash[:success] = "You have successfully logged in"
#       redirect_to users_path
#     else
#       flash.now[:danger] = "There was something wrong with your login information"
#       render 'new'
#     end
#   end
#
#   def destroy
#     session[:user_id] = nil
#     flash[:success] = "You have logged out"
#     redirect_to root_path
#   end
# end
