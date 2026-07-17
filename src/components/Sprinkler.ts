import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_sprinkler_type_t = 'sprinkler';
export type shelly_sprinkler_key_t =
  `${shelly_sprinkler_type_t}:${shelly_component_id_t}`;

export type shelly_sprinkler_sequence_step_t = {
  zone_id: shelly_component_id_t;
  duration?: number;
  delay_before?: number;
  delay_after?: number;
};

export type shelly_sprinkler_status_t = {
  id: shelly_component_id_t;
  master_valve: boolean;
  master_override: boolean;
  active_sequence: string | null;
  weather: {
    avg_temperature: number;
    last_precipitation: number;
    forecast_precipitation?: number;
  } | null;
  rain_delay?: {
    seq_id: number;
    delay_count: number;
    max_delays: number;
  };
};

export type shelly_sprinkler_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  max_active_zones: number;
  weather_enable: boolean;
  base_temp: number;
  duration_offset: number;
  forecast_enable: boolean;
  forecast_hours: number;
  recheck_interval_min: number;
};

export type shelly_sprinkler_rpc_method_map_t = {
  'Sprinkler.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_sprinkler_status_t;
  };
  'Sprinkler.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_sprinkler_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Sprinkler.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_sprinkler_config_t;
  };
  'Sprinkler.MasterOverride': {
    params: {
      id: shelly_component_id_t;
      state: boolean;
    };
    result: null;
  };
  'Sprinkler.AddSequence': {
    params: {
      id: shelly_component_id_t;
      config: {
        name: string;
        steps: shelly_sprinkler_sequence_step_t[];
      };
    };
    result: {
      seq_id: number;
    };
  };
  'Sprinkler.DeleteSequence': {
    params: {
      id: shelly_component_id_t;
      seq_id: number;
    };
    result: {
      seq_id: number;
    };
  };
};
