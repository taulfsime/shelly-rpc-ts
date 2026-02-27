import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_light_config_fade_rate_t,
  shelly_output_component_status_counter_t,
  shelly_output_component_status_source_t,
} from './common.js';
import { at_least_one_prop_t, optional_recursive_t } from './helpers.js';

type shelly_rgbcct_mode_t = 'rgb' | 'cct';

export type shelly_rgbcct_type_t = 'rgbcct';
export type shelly_rgbcct_key_t =
  `${shelly_rgbcct_type_t}:${shelly_component_id_t}`;

export type shelly_rgbcct_status_t = {
  id: shelly_component_id_t;
  source: shelly_output_component_status_source_t;
  tag: string | null;
  mode: shelly_rgbcct_mode_t;
  output: boolean;
  rgb: [number, number, number];
  ct: number;
  brightness: number;
  timer_started_at?: number;
  timer_duration?: number;
  transition?: {
    target: {
      output: boolean;
      brightness: number;
      rgb: [number, number, number];
      ct: number;
    };
    started_at: number;
    duration: number;
  };
  aenergy?: shelly_output_component_status_counter_t;
  apower?: number;
};

export type shelly_rgbcct_config_t = {
  id: shelly_component_id_t;
  name: string | null;
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
    ct: number | null;
    mode: shelly_rgbcct_mode_t | null;
    active_between: [string, string];
  };
};

export type shelly_rgbcct_rpc_method_map_t = {
  'RGBCCT.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_rgbcct_status_t;
  };
  'RGBCCT.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_rgbcct_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'RGBCCT.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_rgbcct_config_t;
  };
  'RGBCCT.Set': {
    params: {
      id: shelly_component_id_t;
      rgb?: [number, number, number];
      ct?: number;
      mode?: shelly_rgbcct_mode_t;
      transition_duration?: number;
      toggle_after?: number;
      offset?: number;
      tag?: string | null;
    } & at_least_one_prop_t<{
      on?: boolean;
      brightness?: number;
    }>;
    result: null;
  };
  'RGBCCT.Toggle': {
    params: {
      id: shelly_component_id_t;
      tag?: string | null;
    };
    result: null;
  };
  'RGBCCT.DimUp': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'RGBCCT.DimDown': {
    params: {
      id: shelly_component_id_t;
      fade_rate?: shelly_light_config_fade_rate_t;
    };
    result: null;
  };
  'RGBCCT.DimStop': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};

export type shelly_rgbcct_webhook_event_t = 'rgbcct.on' | 'rgbcct.off';
