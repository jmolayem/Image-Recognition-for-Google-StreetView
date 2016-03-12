class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def send_to_metamind
  	# If you reach some limit in the database or the record loading gets too slow, this is the way to go:
  	# result = Result.create!
  	# params[:images].each do |image|
  	# 	Response.create!(result: result, data: JSON.parse(Metamind.post_image(image)))
  	# end
  	# result.responses
  	result = Result.create!(
  		responses: params[:images].first(10).map do |image|
					 JSON.parse(Metamind.post_image(image))
				   end
	)

	render json: result
  end
end