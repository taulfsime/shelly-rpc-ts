import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_light_config_fade_rate_t,
  shelly_output_component_status_source_t,
} from './common.js';
import { at_least_one_prop_t } from './helpers.js';

type shelly_cct_status_errors_t = 'overtemp';

export type shelly_cct_type_t = 'cct';
export type shelly_cct_key_t = `${shelly_cct_type_t}:${shelly_component_id_t}`;

export type shelly_cct_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  initial_state: 'off' | 'on' | 'restore_last';
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
  transition_duration?: number;
  min_brightness_on_toggle: number;
  night_mode: {
    enable: boolean;
    brightness: number | null;
    ct: number | null;
    active_between: [string, string];
  };
  button_fade_rate: shelly_light_config_fade_rate_t;
  button_presets?: {
    button_doublepush: null | {
      brightness: number | null;
      ct: number | null;
    };
  };
  range_map?: null | [number, number];
  ct_range?: null | [number, number];
  current_limit?: number;
  power_limit?: number;
  voltage_limit?: number;
};

export type shelly_cct_status_t = {
  id: shelly_component_id_t;
  source: shelly_output_component_status_source_t;
  output: boolean;
  brightness: number;
  ct: number;
  timer_started_at?: number;
  timer_duration?: number;
  transition?: {
    target: {
      output: boolean;
      brightness: number;
      ct: number;
      started_at: number;
      duration: number;
    };
  };
  temperature?: {
    tC: null | number;
    tF: null | number;
  };
  apower?: number;
  voltage?: number;
  current?: number;
  errors?: shelly_cct_status_errors_t[];
};

export type shelly_cct_rpc_method_map_t = {
  'CCT.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cct_status_t;
  };
  'CCT.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_cct_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'CCT.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cct_config_t;
  };
  'CCT.Set': {
    params: {
      id: shelly_component_id_t;
      toggle_after?: number;
      transition_duration?: number;
      offset?: number;
    } & at_least_one_prop_t<{
      on?: boolean;
      brightness?: number;
      ct?: number;
    }>;
    result: null;
  };
  'CCT.Toggle': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'CCT.DimUp': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'CCT.DimDown': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'CCT.DimStop': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};
