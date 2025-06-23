import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_bthomesensor_key_t } from './BTHomeSensor.js';

type shelly_bthomedevice_status_errors_t =
  | 'key_missing_or_bad'
  | 'decrypt_failed'
  | 'parse_failed'
  | 'unencrypted_data';

export type shelly_bthomedevice_type_t = 'bthomedevice';
export type shelly_bthomedevice_key_t =
  `${shelly_bthomedevice_type_t}:${shelly_component_id_t}`;

export type shelly_bthomedevice_status_t = {
  id: shelly_component_id_t;
  rssi: number | null;
  battery: number | null;
  packet_id: number;
  last_update_ts: number;
  errors?: shelly_bthomedevice_status_errors_t[];
};

export type shelly_bthomedevice_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  addr: string;
  key: string | null;
  meta: null | Record<string, unknown>;
};

export type shelly_bthomedevice_event_t =
  | 'single_push'
  | 'double_push'
  | 'triple_push'
  | 'rotate_left'
  | 'rotate_right'
  | 'hold_press';

export type shelly_bthomedevice_rpc_method_map_t = {
  'BTHomeDevice.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bthomedevice_status_t;
  };
  'BTHomeDevice.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_bthomedevice_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BTHomeDevice.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bthomedevice_config_t;
  };
  'BTHomeDevice.GetKnownObjects': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
      objects: {
        obj_id: number;
        idx: number;
        component: shelly_bthomesensor_key_t | null;
      };
    };
  };
};
