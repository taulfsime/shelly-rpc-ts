import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_ledstrip_rgb_t = [number, number, number];

// a built-in effect, or an effect script as `script:<id>`
export type shelly_ledstrip_effect_t = string;

export type shelly_ledstrip_type_t = 'ledstrip';
export type shelly_ledstrip_key_t =
  `${shelly_ledstrip_type_t}:${shelly_component_id_t}`;

export type shelly_ledstrip_status_t = {
  id: shelly_component_id_t;
  on: boolean;
  brightness: number;
  effect: shelly_ledstrip_effect_t;
  // only the controls the effect takes
  rgb?: shelly_ledstrip_rgb_t;
  bg_rgb?: shelly_ledstrip_rgb_t;
  palette?: string;
  speed?: number;
  intensity?: number;
  reverse?: boolean;
  errors?: string[];
};

export type shelly_ledstrip_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  initial_state: 0 | 1 | 2;
  num_leds: number;
  protocol: 'ws2812' | 'ws2812b' | 'ws2811' | 'sk6812' | 'ws2811w' | 'sk9822';
  color_order: 'default' | 'rgb' | 'grb' | 'brg' | 'rbg' | 'gbr' | 'bgr';
  ddp_port: number;
  effects: shelly_ledstrip_effect_t[]; // the effects it cycles through
};

export type shelly_ledstrip_rpc_method_map_t = {
  'LedStrip.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_ledstrip_status_t;
  };
  'LedStrip.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_ledstrip_config_t;
  };
  'LedStrip.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: Partial<Omit<shelly_ledstrip_config_t, 'id'>>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'LedStrip.Set': {
    params: {
      id: shelly_component_id_t;
      on?: boolean;
      brightness?: number;
      effect?: shelly_ledstrip_effect_t;
      palette?: string;
      rgb?: shelly_ledstrip_rgb_t;
      bg_rgb?: shelly_ledstrip_rgb_t;
      speed?: number;
      intensity?: number;
      reverse?: boolean;
    };
    result: null;
  };
  'LedStrip.AddEffect': {
    params: {
      id: shelly_component_id_t;
      effect: shelly_ledstrip_effect_t;
    };
    result: null;
  };
  'LedStrip.RemoveEffect': {
    params: {
      id: shelly_component_id_t;
      effect: shelly_ledstrip_effect_t;
    };
    result: null;
  };
  'LedStrip.NextEffect': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'LedStrip.ResetEffect': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};
