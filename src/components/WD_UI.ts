export type shelly_wd_ui_type_t = 'wd_ui';
export type shelly_wd_ui_key_t = shelly_wd_ui_type_t;

export type shelly_wd_ui_status_t = {};

export type shelly_wd_ui_config_t = {
  sys_led_enable: boolean;
  power_led: 'on' | 'off' | 'match_output' | 'inverted_output';
};

export type shelly_wd_ui_rpc_method_map_t = {
  'WD_UI.GetStatus': {
    params?: {};
    result: shelly_wd_ui_status_t;
  };
  'WD_UI.SetConfig': {
    params: {
      config: shelly_wd_ui_config_t;
    };
  };
  'WD_UI.GetConfig': {
    params?: {};
    result: shelly_wd_ui_config_t;
  };
};
