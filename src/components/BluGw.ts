export type shelly_blugw_type_t = 'blugw';
export type shelly_blugw_key_t = shelly_blugw_type_t;

export type shelly_blugw_config_t = {
  sys_led_enable: boolean;
};
export type shelly_blugw_status_t = {};

export type shelly_blugw_rpc_method_map_t = {
  'BluGw.GetStatus': {
    params: never;
    result: shelly_blugw_status_t;
  };
  'BluGw.SetConfig': {
    params: {
      config: shelly_blugw_config_t;
    };
  };
  'BluGw.GetConfig': {
    params: never;
    result: shelly_blugw_config_t;
  };
};
