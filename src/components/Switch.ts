import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_output_component_status_source_t,
  shelly_output_component_status_counter_t,
} from './common.js';

type shelly_switch_status_errors_t =
  | 'overtemp'
  | 'overpower'
  | 'overvoltage'
  | 'undervoltage';

export type shelly_switch_type_t = 'switch';
export type shelly_switch_key_t =
  `${shelly_switch_type_t}:${shelly_component_id_t}`;

export type shelly_switch_status_t = {
  id: shelly_component_id_t;
  source: shelly_output_component_status_source_t;
  output: boolean;
  timer_started_at?: number;
  timer_duration?: number;
  apower?: number;
  voltage?: number;
  current?: number;
  pf?: number;
  freq?: number;
  aenergy?: shelly_output_component_status_counter_t;
  ret_aenergy?: shelly_output_component_status_counter_t;
  temperature?: {
    tC: null | number;
    tF: null | number;
  };
  errors?: shelly_switch_status_errors_t[];
};

export type shelly_switch_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  in_mode: 'momentary' | 'follow' | 'flip' | 'detached' | 'cycle' | 'activate';
  in_locked: boolean;
  initial_state: 'off' | 'on' | 'restore_last' | 'match_input';
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
  autorecover_voltage_errors: boolean;
  input_id?: 0 | 1;
  power_limit?: number;
  voltage_limit?: number;
  undervoltage_limit?: number;
  current_limit?: number;
  reverse?: boolean;
};

export type shelly_switch_rpc_method_map_t = {
  'Switch.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_switch_status_t;
  };
  'Switch.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_switch_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Switch.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_switch_config_t;
  };
  'Switch.Set': {
    params: {
      id: shelly_component_id_t;
      on: boolean;
      toggle_after?: number;
    };
    result: {
      was_on: boolean;
    };
  };
  'Switch.Toggle': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      was_on: boolean;
    };
  };
  'Switch.ResetCounters': {
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
