module Budgets::HeroHelper
  def hero_form_with(model, **, &)
    form_with(
      model:,
      data: hero_form_data_options,
      **,
      &
    )
  end

  def hero_form_data_options
    {
      controller: "drop-target upload",
      action: hero_data_actions
    }
  end

  def hero_data_actions
    drag_and_drop_actions = "drop-target:drop->upload#dropFiles upload:complete->upload#submit"
    token_list(drop_target_actions, drag_and_drop_actions)
  end
end
