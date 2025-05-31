import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_virtual_component_status_source_t } from '../Virtual.js';
import { shelly_service_key_t, shelly_service_role_t } from '../Service.js';

export type shelly_boolean_type_t = 'boolean';
export type shelly_boolean_key_t =
  `${shelly_boolean_type_t}:${shelly_component_id_t}`;

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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
          value: boolean;
        };
    result: null;
  };
};
