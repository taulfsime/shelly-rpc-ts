import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_virtual_component_status_source_t } from '../Virtual.js';
import { shelly_service_key_t, shelly_service_role_t } from '../Service.js';
import { optional_recursive_t } from '../helpers.js';

type shelly_enum_option_t = string;

export type shelly_enum_type_t = 'enum';
export type shelly_enum_key_t =
  `${shelly_enum_type_t}:${shelly_component_id_t}`;

export type shelly_enum_status_t = {
  value: shelly_enum_option_t | null;
  last_update_ts: number;
  source: shelly_virtual_component_status_source_t;
};

export type shelly_enum_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  persisted: boolean;
  options: shelly_enum_option_t[];
  default_value: shelly_enum_option_t | null;
  meta: null | Record<string, unknown>;
};

export type shelly_enum_rpc_method_map_t = {
  'Enum.GetStatus': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
        };
    result: shelly_enum_status_t;
  };
  'Enum.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: optional_recursive_t<shelly_enum_config_t>;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
          config: optional_recursive_t<shelly_enum_config_t>;
        };
    result: {
      restart_required: boolean;
    };
  };
  'Enum.GetConfig': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
        };
    result: shelly_enum_config_t;
  };
  'Enum.Set': {
    params:
      | {
          id: shelly_component_id_t;
          value: shelly_enum_option_t | null;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
          value: shelly_enum_option_t | null;
        };
    result: null;
  };
};

export type shelly_enum_webhook_event_t = 'enum.change';
