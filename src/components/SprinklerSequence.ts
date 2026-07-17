import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';
import { shelly_sprinkler_sequence_step_t } from './Sprinkler.js';

export type shelly_sprinklersequence_type_t = 'sprinklersequence';
export type shelly_sprinklersequence_key_t =
  `${shelly_sprinklersequence_type_t}:${shelly_component_id_t}`;

export type shelly_sprinklersequence_status_t = {
  id: shelly_component_id_t;
  running?: {
    step: number;
    sequence_started_ts: number;
    step_started_ts: number;
  };
};

export type shelly_sprinklersequence_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  steps: shelly_sprinkler_sequence_step_t[];
};

export type shelly_sprinklersequence_rpc_method_map_t = {
  'SprinklerSequence.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_sprinklersequence_status_t;
  };
  'SprinklerSequence.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_sprinklersequence_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'SprinklerSequence.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_sprinklersequence_config_t;
  };
  'SprinklerSequence.Start': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'SprinklerSequence.Stop': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
};

export type shelly_sprinklersequence_webhook_event_t =
  | 'sprinklersequence.start'
  | 'sprinklersequence.stop';
