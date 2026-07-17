import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_sprinklerzone_source_t =
  | 'rpc'
  | 'button'
  | 'sequence'
  | 'timer';

export type shelly_sprinklerzone_type_t = 'sprinklerzone';
export type shelly_sprinklerzone_key_t =
  `${shelly_sprinklerzone_type_t}:${shelly_component_id_t}`;

export type shelly_sprinklerzone_status_t = {
  id: shelly_component_id_t;
  state: boolean;
  source: shelly_sprinklerzone_source_t | null;
  last_change_ts: number | null;
  watering?: {
    started_at: number;
    duration: number;
  };
};

export type shelly_sprinklerzone_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  duration: number;
  flow_rate: number;
};

export type shelly_sprinklerzone_rpc_method_map_t = {
  'SprinklerZone.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_sprinklerzone_status_t;
  };
  'SprinklerZone.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_sprinklerzone_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'SprinklerZone.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_sprinklerzone_config_t;
  };
  'SprinklerZone.Start': {
    params: {
      id: shelly_component_id_t;
      duration?: number;
    };
    result: null;
  };
  'SprinklerZone.Stop': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};

export type shelly_sprinklerzone_webhook_event_t =
  | 'sprinklerzone.start'
  | 'sprinklerzone.stop';
