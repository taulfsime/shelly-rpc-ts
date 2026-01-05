import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';
import {
  shelly_rgb_config_t,
  shelly_rgb_rpc_method_map_t,
  shelly_rgb_status_t,
} from './RGB.js';

export type shelly_rgbw_type_t = 'rgbw';
export type shelly_rgbw_key_t =
  `${shelly_rgbw_type_t}:${shelly_component_id_t}`;

export type shelly_rgbw_status_t = shelly_rgb_status_t & {
  white: number;

  transition?: {
    target: NonNullable<shelly_rgb_status_t['transition']>['target'] & {
      white: number;
    };
  };
};

export type shelly_rgbw_config_t = shelly_rgb_config_t & {
  night_mode: shelly_rgb_config_t & {
    while: number | null;
  };

  button_presets: {
    button_doublepush:
      | null
      | (NonNullable<
          shelly_rgb_config_t['button_presets']
        >['button_doublepush'] & {
          while: number | null;
        });
  };
};

export type shelly_rgbw_rpc_method_map_t = {
  'RGBW.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_rgbw_status_t;
  };
  'RGBW.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_rgbw_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'RGBW.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_rgbw_config_t;
  };
  'RGBW.Set': {
    params: NonNullable<shelly_rgb_rpc_method_map_t['RGB.Set']>['params'] & {
      white?: number;
    };
    result: null;
  };
  'RGBW.Toggle': shelly_rgb_rpc_method_map_t['RGB.Toggle'];
  'RGBW.DimUp': shelly_rgb_rpc_method_map_t['RGB.DimUp'];
  'RGBW.DimDown': shelly_rgb_rpc_method_map_t['RGB.DimDown'];
  'RGBW.DimStop': shelly_rgb_rpc_method_map_t['RGB.DimStop'];
};

export type shelly_rgbw_webhook_event_t = 'rgbw.on' | 'rgbw.off';
