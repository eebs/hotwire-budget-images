class Budget < ApplicationRecord
  has_one_attached :hero do |attachable|
    attachable.variant :card, resize_to_fill: [320, 240], preprocessed: true
  end
end
