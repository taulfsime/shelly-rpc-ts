import { shelly_component_id_t } from '../ShellyRpc';
import {
  shelly_output_component_status_counter_t,
  shelly_output_component_status_source_t,
} from './common';

type shelly_light_status_errors_t =
  | 'overtemp'
  | 'overpower'
  | 'overvoltage'
  | 'undervoltage'
  | 'overcurrent'
  | 'unsupported_load'
  | 'cal_abort:interrupted'
  | 'cal_abort:power_read'
  | 'cal_abort:no_load'
  | 'cal_abort:no_synchro'
  | 'cal_abort:non_dimmable'
  | 'cal_abort:overpower'
  | 'cal_abort:unsupported_load';

type shelly_light_status_flags_t = 'no_load' | 'uncalibrated';

type shelly_light_config_fade_rate_t = 1 | 2 | 3 | 4 | 5;

export type shelly_light_status_t = {
  id: shelly_component_id_t;
  source: shelly_output_component_status_source_t;
  output: boolean;
  brightness: number;
  timer_started_at?: number;
  timer_duration?: number;
  transition?: {
    target: {
      output: boolean;
      brightness: number;
    };
    started_at: number;
    duration: number;
  };
  temperature?: {
    tC: null | number;
    tF: null | number;
  };
  aenergy?: shelly_output_component_status_counter_t;
  apower?: number;
  voltage?: number;
  current?: number;
  calibration?: {
    progress: number;
  };
  flags?: shelly_light_status_flags_t[];
  errors?: shelly_light_status_errors_t[];
};

export type shelly_light_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  in_mode: 'follow' | 'flip' | 'activate' | 'detached' | 'dim' | 'dual_dim';
  op_mode?: 0 | 1;
  initial_state: 'off' | 'on' | 'restore_last';
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
  transition_duration?: number;
  min_brightness_on_toggle: number;
  night_mode: {
    enable: boolean;
    brightness: number;
    active_between: [string, string];
  };
  button_fade_rate: shelly_light_config_fade_rate_t;
  button_presets: {
    button_doublepush: null | {
      brightness: number;
    };
  };
  range_map?: [number, number];
  power_limit?: number;
  voltage_limit?: number;
  undervoltage_limit?: number;
  current_limit?: number;
};

export type shelly_light_rpc_method_map_t = {
  'Light.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_light_status_t;
  };
  'Light.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_light_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Light.Set': {
    params: {
      id: shelly_component_id_t;
      on?: boolean;
      brightness?: number;
      toggle_after?: number;
      offset?: number;
    };
    result: null;
  };
  'Light.Toggle': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Light.DimUp': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'Light.DimDown': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'Light.DimStop': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Light.SetAll': {
    params: {
      on?: boolean;
      brightness?: number;
      toggle_after?: number;
      offset?: number;
      transition_duration?: number;
    };
  };
  'Light.Calibrate': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Light.ResetCounters': {
    params: {
      id: shelly_component_id_t;
      type?: ['aenergy'];
    };
    result: {
      aenergy: {
        total: number;
      };
    };
  };
};
