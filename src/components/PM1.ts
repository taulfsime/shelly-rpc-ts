import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_alarms_config_t,
  shelly_alarms_status_flags_t,
  shelly_output_component_status_counter_t,
} from './common.js';
import { optional_recursive_t } from './helpers.js';

type shelly_pm1_status_errors_t =
  | 'power_meter_failure'
  | 'out_of_range:voltage'
  | 'out_of_range:current'
  | 'out_of_range:aprtpower'
  | 'out_of_range:apower';

export type shelly_pm1_type_t = 'pm1';
export type shelly_pm1_key_t = `${shelly_pm1_type_t}:${shelly_component_id_t}`;

export type shelly_pm1_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  reverse: boolean;
  alarms: shelly_alarms_config_t | null;
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
  flags?: shelly_alarms_status_flags_t[];
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
      config: optional_recursive_t<shelly_pm1_config_t>;
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

export type shelly_pm1_webhook_event_t =
  | 'pm1.voltage_change'
  | 'pm1.current_change'
  | 'pm1.apower_change'
  | 'pm1.alarm_undervoltage'
  | 'pm1.alarm_undervoltage_clear'
  | 'pm1.alarm_overvoltage'
  | 'pm1.alarm_overvoltage_clear'
  | 'pm1.alarm_undercurrent'
  | 'pm1.alarm_undercurrent_clear'
  | 'pm1.alarm_overcurrent'
  | 'pm1.alarm_overcurrent_clear'
  | 'pm1.alarm_underpower'
  | 'pm1.alarm_underpower_clear'
  | 'pm1.alarm_overpower'
  | 'pm1.alarm_overpower_clear';
