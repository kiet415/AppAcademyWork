class SessionsController < ApplicationController
    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.find_by_credentials(params[:user][:email],params[:user][:password])
        if @user
            log_in(@user)
            redirect_to bands_url
        else
            render :show
        end
    end
    def destroy 
        current_user.reset_session_token!
        session[:session_token] = nil 
        redirect_to bands_url
    end
end
