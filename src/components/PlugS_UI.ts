import { shelly_switch_key_t } from './Switch.js';

type shelly_plugs_ui_leds_mode_t = 'power' | 'switch' | 'off';
type shelly_plugs_ui_controls_mode_t = 'detached' | 'momentary';

export type shelly_plugs_ui_type_t = 'plugs_ui';
export type shelly_plugs_ui_key_t = shelly_plugs_ui_type_t;

export type shelly_plugs_ui_status_t = {};

export type shelly_plugs_ui_config_t = {
  leds: {
    mode: shelly_plugs_ui_leds_mode_t;
    colors: {
      [key: shelly_switch_key_t]: {
        on: {
          rgb: [number, number, number] | null;
          brightness: number;
        };
        off: {
          rgb: [number, number, number] | null;
          brightness: number;
        };
      };
      power: {
        brightness: number;
      };
    };
    night_mode: {
      enable: boolean;
      brightness: number;
      active_between: [string, string];
    };
  };
  controls: {
    [key: shelly_switch_key_t]: {
      in_mode: shelly_plugs_ui_controls_mode_t;
    };
  };
};

export type shelly_plugs_ui_rpc_method_map_t = {
  'PlugS_UI.GetStatus': {
    params: never;
    result: shelly_plugs_ui_status_t;
  };
  'PlugS_UI.SetConfig': {
    params: {
      config: shelly_plugs_ui_config_t;
    };
  };
  'PlugS_UI.GetConfig': {
    params: never;
    result: shelly_plugs_ui_config_t;
  };
};
