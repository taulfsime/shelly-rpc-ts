import { shelly_component_id_t, shelly_component_key_t } from '../ShellyRpc.js';
import { shelly_virtual_component_status_source_t } from './common.js';

export type shelly_number_status_t = {
  source: shelly_virtual_component_status_source_t;
  value: number;
  last_update_ts: number;
};

export type shelly_number_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  persisted: boolean;
  default_value: number;
  meta: null | Record<string, unknown>;
  min: number;
  max: number;
};

export type shelly_number_rpc_method_map_t = {
  'Number.GetStatus': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_number_status_t;
  };
  'Number.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: shelly_number_config_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          config: shelly_number_config_t;
        };
    result: {
      restart_required: boolean;
    };
  };
  'Number.GetConfig': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_number_config_t;
  };
  'Number.Set': {
    params:
      | {
          id: shelly_component_id_t;
          value: number;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          value: number;
        };
    result: null;
  };
};
