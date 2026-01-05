import { optional_recursive_t } from './helpers.js';

export type shelly_blugw_type_t = 'blugw';
export type shelly_blugw_key_t = shelly_blugw_type_t;

export type shelly_blugw_config_t = {
  sys_led_enable: boolean;
};
export type shelly_blugw_status_t = {};

export type shelly_blugw_rpc_method_map_t = {
  'BluGw.GetStatus': {
    params?: {};
    result: shelly_blugw_status_t;
  };
  'BluGw.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_blugw_config_t>;
    };
  };
  'BluGw.GetConfig': {
    params?: {};
    result: shelly_blugw_config_t;
  };
};
