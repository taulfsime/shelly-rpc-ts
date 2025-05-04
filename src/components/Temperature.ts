import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_temperature_status_errors_t = 'out_of_range' | 'read';

export type shelly_temperature_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  report_thr_C: number;
  offset_C: number;
};

export type shelly_temperature_status_t = {
  id: shelly_component_id_t;
  tC: number | null;
  tF: number | null;
  errors?: shelly_temperature_status_errors_t[];
};

export type shelly_temperature_rpc_method_map_t = {
  'Temperature.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_temperature_status_t;
  };
  'Temperature.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_temperature_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Temperature.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_temperature_config_t;
  };
};
