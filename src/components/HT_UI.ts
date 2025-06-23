export type shelly_ht_ui_type_t = 'ht_ui';
export type shelly_ht_ui_key_t = shelly_ht_ui_type_t;

export type shelly_ht_ui_status_t = {};

export type shelly_ht_ui_config_t = {
  temperature_unit: 'C' | 'F';
};

export type shelly_ht_ui_rpc_method_map_t = {
  'HT_UI.GetStatus': {
    params?: {};
    result: shelly_ht_ui_status_t;
  };
  'HT_UI.SetConfig': {
    params: {
      config: shelly_ht_ui_config_t;
    };
  };
  'HT_UI.GetConfig': {
    params?: {};
    result: shelly_ht_ui_config_t;
  };
};
