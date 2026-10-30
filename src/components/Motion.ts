import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_motion_type_t = 'motion';
export type shelly_motion_key_t =
  `${shelly_motion_type_t}:${shelly_component_id_t}`;

export type shelly_motion_sensitivity_t = 'low' | 'medium' | 'high';

export type shelly_motion_status_t = {
  id: shelly_component_id_t;
  motion: boolean;
  errors?: string[];
};

export type shelly_motion_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  sensitivity: shelly_motion_sensitivity_t;
  pulse_count?: number;
  window_time?: 2 | 4 | 6 | 8;
  blind_time: number;
  lux_threshold?: number;
};

export type shelly_motion_rpc_method_map_t = {
  'Motion.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_motion_status_t;
  };
  'Motion.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_motion_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Motion.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_motion_config_t;
  };
};

export type shelly_motion_webhook_event_t =
  | 'motion.motion'
  | 'motion.motion_end';
