import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_devicepower_status_errors_t = 'read';

export type shelly_devicepower_status_t = {
  id: shelly_component_id_t;
  battery: {
    V: number | null;
    percent: number | null;
  };
  external: {
    present?: boolean;
  };
  errors?: shelly_devicepower_status_errors_t[];
};

export type shelly_devicepower_config_t = {
  id: shelly_component_id_t;
};

export type shelly_devicepower_rpc_method_map_t = {
  'DevicePower.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_devicepower_status_t;
  };
  'DevicePower.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_devicepower_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'DevicePower.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_devicepower_config_t;
  };
};
