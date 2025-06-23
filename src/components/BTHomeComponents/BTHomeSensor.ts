import { shelly_component_id_t } from '../../ShellyComponents.js';

export type shelly_bthomesensor_type_t = 'bthomesensor';
export type shelly_bthomesensor_key_t =
  `${shelly_bthomesensor_type_t}:${shelly_component_id_t}`;

export type shelly_bthomesensor_object_id_t = number;
export type shelly_bthomesensor_object_index_t = number;
export type shelly_bthomesensor_object_type_t =
  | 'sensor'
  | 'binary_sensor'
  | 'button'
  | 'dimmer'
  | 'unknown'
  | 'raw_sensor'
  | 'other';

export type shelly_bthomesensor_status_t = {
  id: shelly_component_id_t;
  value: boolean | string | number;
  last_update_ts: number;
};

export type shelly_bthomesensor_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  obj_id: shelly_bthomesensor_object_id_t;
  idx: shelly_bthomesensor_object_index_t;
  addr: string;
  meta: null | Record<string, unknown>;
};

export type shelly_bthomesensor_rpc_method_map_t = {
  'BthomeSensor.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bthomesensor_status_t;
  };
  'BthomeSensor.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_bthomesensor_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BthomeSensor.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bthomesensor_config_t;
  };
};
