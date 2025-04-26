import { shelly_component_id_t, shelly_component_key_t } from '../ShellyRpc';
import { shelly_virtual_component_status_source_t } from './ShellyVirtualComponent';

export type shelly_text_status_t = {
  source: shelly_virtual_component_status_source_t;
  value: string;
  last_update_ts: number;
};

export type shelly_text_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  persisted: boolean;
  default_value: string;
  meta: null | Record<string, unknown>;
  max_len: number;
};

export type shelly_text_rpc_method_map_t = {
  'Text.GetStatus': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_text_status_t;
  };
  'Text.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: shelly_text_config_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          config: shelly_text_config_t;
        };
    result: {
      restart_required: boolean;
    };
  };
  'Text.GetConfig': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
        };
    result: shelly_text_config_t;
  };
  'Text.Set': {
    params:
      | {
          id: shelly_component_id_t;
          value: string;
        }
      | {
          role: string;
          owner: shelly_component_key_t;
          value: string;
        };
    result: null;
  };
};
