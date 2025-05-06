import {
  shelly_component_id_t,
  shelly_component_key_t,
} from '../../ShellyComponents.js';
import { shelly_virtual_component_status_source_t } from '../common.js';

type shelly_enum_option_t = string;

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
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_enum_status_t;
  };
  'Enum.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: shelly_enum_config_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          config: shelly_enum_config_t;
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
          role: string;
          owner: shelly_component_key_t;
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
          role: string;
          owner: shelly_component_key_t;
          value: shelly_enum_option_t | null;
        };
    result: null;
  };
};
