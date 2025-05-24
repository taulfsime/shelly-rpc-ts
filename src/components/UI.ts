export type shelly_ui_type_t = 'ui';
export type shelly_ui_key_t = shelly_ui_type_t;

export type shelly_ui_status_t = {};

export type shelly_ui_config_t = {
  idle_brightness: number;
};

export type shelly_ui_rpc_method_map_t = {
  'UI.GetConfig': {
    params: never;
    result: shelly_ui_config_t;
  };
  'UI.SetConfig': {
    params: {
      config: shelly_ui_config_t;
    };
  };
  'UI.GetStatus': {
    params: never;
    result: shelly_ui_status_t;
  };
};
