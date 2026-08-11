import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_output_component_status_counter_t } from './common.js';
import { optional_recursive_t } from './helpers.js';

type shelly_fan_mode_t = 'manual' | 'auto';

type shelly_fan_status_errors_t =
  | 'overcurrent'
  | 'overvoltage'
  | 'undervoltage'
  | 'overpower';

export type shelly_fan_type_t = 'fan';
export type shelly_fan_key_t = `${shelly_fan_type_t}:${shelly_component_id_t}`;

export type shelly_fan_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  initial_state: 'off' | 'on' | 'restore_last';
  night_mode: {
    enable: boolean;
    limit: number;
    active_between: [string, string];
  };
};

export type shelly_fan_status_t = {
  id: shelly_component_id_t;
  mode: shelly_fan_mode_t;
  on: boolean;
  speed: number;
  source: string;
  aenergy?: shelly_output_component_status_counter_t;
  night_mode: {
    active: boolean;
    active_between?: [string, string];
  };
  errors?: shelly_fan_status_errors_t[];
};

export type shelly_fan_rpc_method_map_t = {
  'Fan.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_fan_status_t;
  };
  'Fan.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_fan_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Fan.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_fan_config_t;
  };
  'Fan.Set': {
    params: {
      id: shelly_component_id_t;
      mode: shelly_fan_mode_t;
      on?: boolean;
      speed?: number;
    };
    result: null;
  };
};

export type shelly_fan_webhook_event_t =
  | 'fan.output_changed'
  | 'fan.speed_changed';
