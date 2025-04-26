import { shelly_virtual_component_status_source_t } from './common';

export type shelly_boolean_status_t = {
  source: shelly_virtual_component_status_source_t;
  value: boolean;
  last_update_ts: number;
};

export type shelly_boolean_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  persisted: boolean;
  default_value: boolean;
  meta: null | Record<string, unknown>;
};

export type shelly_boolean_rpc_method_map_t = {
  'Boolean.GetStatus': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_boolean_status_t;
  };
  'Boolean.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: shelly_boolean_config_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          config: shelly_boolean_config_t;
        };
    result: {
      restart_required: boolean;
    };
  };
  'Boolean.GetConfig': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_boolean_config_t;
  };
  'Boolean.Set': {
    params:
      | {
          id: shelly_component_id_t;
          value: boolean;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          value: boolean;
        };
    result: null;
  };
};
