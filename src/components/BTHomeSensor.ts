import { shelly_component_id_t } from '../ShellyRpc.js';

export type shelly_bthomesensor_status_t = {
  id: shelly_component_id_t;
  value: boolean | string | number;
  last_update_ts: number;
};

export type shelly_bthomesensor_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  obj_id: number;
  idx: number;
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
