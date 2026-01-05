import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_virtual_component_status_source_t } from '../Virtual.js';
import { shelly_service_key_t, shelly_service_role_t } from '../Service.js';
import { optional_recursive_t } from '../helpers.js';

export type shelly_number_type_t = 'number';
export type shelly_number_key_t =
  `${shelly_number_type_t}:${shelly_component_id_t}`;

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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
        };
    result: shelly_number_status_t;
  };
  'Number.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: optional_recursive_t<shelly_number_config_t>;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
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
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
          value: number;
        };
    result: null;
  };
};

export type shelly_number_webhook_event_t = 'number.change';
