class Metamind
  ENDPOINT = "https://www.metamind.io/vision/classify"
  CLASSIFIER_ID = 40803

  def self.post_image(image_url)
    new.post_image(image_url)
  end

  def initialize
    @headers = {
      'Authorization' => "Basic #{ENV['METAMIND_API_KEY']}"
    }
  end

  def post_image(image_url)
    payload = { classifier_id: CLASSIFIER_ID, image_url: image_url }
    RestClient.post(ENDPOINT, payload.to_json, @headers)
  end
end