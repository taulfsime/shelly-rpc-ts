import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_output_component_status_counter_t } from './common.js';

type shelly_pm1_status_errors_t =
  | 'power_meter_failure'
  | 'out_of_range:voltage'
  | 'out_of_range:current'
  | 'out_of_range:aprtpower'
  | 'out_of_range:apower';

export type shelly_pm1_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  reverse: boolean;
};

export type shelly_pm1_status_t = {
  id: shelly_component_id_t;
  voltage: number;
  current: number;
  apower: number;
  aprtpower?: number;
  pf?: number;
  freq?: number;
  aenergy: shelly_output_component_status_counter_t;
  ret_aenergy: shelly_output_component_status_counter_t;
  errors?: shelly_pm1_status_errors_t[];
};

export type shelly_pm1_rpc_method_map_t = {
  'PM1.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_pm1_status_t;
  };
  'PM1.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_pm1_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'PM1.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_pm1_config_t;
  };
  'PM1.ResetCounters': {
    params: {
      id: shelly_component_id_t;
      type?: ('aenergy' | 'ret_aenergy')[];
    };
    result: {
      aenergy: {
        total: number;
      };
      ret_aenergy: {
        total: number;
      };
    };
  };
};
