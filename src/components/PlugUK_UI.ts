import { optional_recursive_t } from './helpers.js';
import {
  shelly_plugs_ui_config_t,
  shelly_plugs_ui_status_t,
} from './PlugS_UI.js';

export type shelly_pluguk_ui_type_t = 'pluguk_ui';
export type shelly_pluguk_ui_key_t = shelly_pluguk_ui_type_t;

export type shelly_pluguk_ui_status_t = shelly_plugs_ui_status_t;

export type shelly_pluguk_ui_config_t = shelly_plugs_ui_config_t;

export type shelly_pluguk_ui_rpc_method_map_t = {
  'PlugUK_UI.GetStatus': {
    params?: {};
    result: shelly_pluguk_ui_status_t;
  };
  'PlugUK_UI.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_pluguk_ui_config_t>;
    };
  };
  'PlugUK_UI.GetConfig': {
    params?: {};
    result: shelly_pluguk_ui_config_t;
  };
};
