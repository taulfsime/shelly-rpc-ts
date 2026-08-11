import { optional_recursive_t } from './helpers.js';

type shelly_pill_mode_t =
  | 'onewire'
  | 'dht22'
  | 'analog_in'
  | 'ssr'
  | 'digital_io'
  | 'serial';

type shelly_pill_pin_mode_t =
  | 'none'
  | 'reserved'
  | 'digital_in'
  | 'digital_out';

export type shelly_pill_type_t = 'pill';
export type shelly_pill_key_t = shelly_pill_type_t;

export type shelly_pill_config_t = {
  mode: shelly_pill_mode_t;
  pin0_mode: shelly_pill_pin_mode_t;
  pin1_mode: shelly_pill_pin_mode_t;
  pin2_mode: shelly_pill_pin_mode_t;
};

export type shelly_pill_status_t = {};

export type shelly_pill_rpc_method_map_t = {
  'Pill.GetStatus': {
    params?: {};
    result: shelly_pill_status_t;
  };
  'Pill.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_pill_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Pill.GetConfig': {
    params?: {};
    result: shelly_pill_config_t;
  };
};
