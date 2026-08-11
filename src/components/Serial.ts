import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_serial_mode_t =
  | 'disabled'
  | 'jsuart'
  | 'mb_server'
  | 'mb_client';

type shelly_serial_data_bits_t = 7 | 8;
type shelly_serial_parity_t = 'N' | 'E' | 'O';
type shelly_serial_stop_bits_t = 1 | 2 | 'x';
type shelly_serial_format_t =
  `${shelly_serial_data_bits_t}${shelly_serial_parity_t}${shelly_serial_stop_bits_t}`;

export type shelly_serial_type_t = 'serial';
export type shelly_serial_key_t =
  `${shelly_serial_type_t}:${shelly_component_id_t}`;

export type shelly_serial_attrs_t = {
  modes: shelly_serial_mode_t[];
};

export type shelly_serial_config_t = {
  id: shelly_component_id_t;
  mode: shelly_serial_mode_t;
  serial: {
    baud: number;
    format: shelly_serial_format_t;
    hd?: boolean;
    de_al?: boolean;
  };
  mb_server?: {
    addr: number;
  };
  mb_client?: Record<string, unknown>;
};

export type shelly_serial_status_t = {};

export type shelly_serial_rpc_method_map_t = {
  'Serial.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_serial_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Serial.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_serial_config_t;
  };
};
