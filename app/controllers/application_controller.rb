class ApplicationController < ActionController::Base
  include ActiveStorage::SetCurrent

  etag { Rails.application.importmap.digest(resolver: helpers) if request.format&.html? }
end
