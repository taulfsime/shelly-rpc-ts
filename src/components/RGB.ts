import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_light_config_fade_rate_t,
  shelly_output_component_status_counter_t,
  shelly_output_component_status_source_t,
} from './common.js';

type shelly_rpc_status_errors_t = 'overtemp';

export type shelly_rgb_status_t = {
  id: shelly_component_id_t;
  source: shelly_output_component_status_source_t;
  output: boolean;
  rgb: [number, number, number];
  brightness: number;
  timer_started_at?: number;
  timer_duration?: number;
  transition?: {
    target: {
      output: boolean;
      rgb: [number, number, number];
      brightness: number;
    };
    started_at: number;
    duration: number;
  };
  temperature?: {
    tC: number | null;
    tF: number | null;
  };
  aenergy?: shelly_output_component_status_counter_t;
  apower: number;
  voltage: number;
  current: number;
  errors?: shelly_rpc_status_errors_t[];
};

export type shelly_rgb_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  in_mode: 'follow' | 'flip' | 'activate' | 'detached' | 'dim';
  initial_state: 'off' | 'on' | 'restore_last';
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
  transition_duration: number;
  min_brightness_on_toggle: number;
  night_mode: {
    enable: boolean;
    brightness: number | null;
    rgb: [number, number, number] | null;
    active_between: [string, string];
  };
  button_fade_rate: shelly_light_config_fade_rate_t;
  button_presets: {
    button_doublepush: null | {
      brightness: number | null;
      rgb: [number, number, number] | null;
    };
  };
  current_limit?: number;
  voltage_limit?: number;
  power_limit?: number;
};

export type shelly_rgb_rpc_method_map_t = {
  'RGB.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_rgb_status_t;
  };
  'RGB.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_rgb_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'RGB.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_rgb_config_t;
  };
  'RGB.Set': {
    params: {
      id: shelly_component_id_t;
      on?: boolean;
      brightness?: number;
      rgb?: [number, number, number];
      transition_duration?: number;
      toggle_after?: number;
      offset?: number;
    };
    result: null;
  };
  'RGB.Toggle': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'RGB.DimUp': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'RGB.DimDown': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'RGB.DimStop': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};
