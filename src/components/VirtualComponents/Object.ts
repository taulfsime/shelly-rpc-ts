import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_virtual_component_status_source_t } from '../common.js';
import { shelly_service_key_t } from '../Service.js';

export type shelly_object_type_t = 'object';
export type shelly_object_key_t =
  `${shelly_object_type_t}:${shelly_component_id_t}`;

export type shelly_object_status_t = {
  source: shelly_virtual_component_status_source_t;
  value: Record<string, unknown> | null;
  last_update_ts: number;
};

export type shelly_object_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  meta: null | Record<string, unknown>;
};

export type shelly_object_rpc_method_map_t = {
  'Object.GetStatus': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_service_key_t;
        };
    result: shelly_object_status_t;
  };
  'Object.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: shelly_object_config_t;
        }
      | {
          role: string;
          owner: shelly_service_key_t;
          config: shelly_object_config_t;
        };
    result: {
      restart_required: boolean;
    };
  };
  'Object.GetConfig': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_service_key_t;
        };
    result: shelly_object_config_t;
  };
  'Object.Set': {
    params:
      | {
          id: shelly_component_id_t;
          value: boolean;
        }
      | {
          role: string;
          owner: shelly_service_key_t;
          value: boolean;
        };
    result: null;
  };
};
