class Result < ActiveRecord::Base
	serialize :responses, Array
end