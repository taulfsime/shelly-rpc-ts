import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_service_key_t, shelly_service_role_t } from '../Service.js';

export type shelly_button_type_t = 'button';
export type shelly_button_key_t =
  `${shelly_button_type_t}:${shelly_component_id_t}`;

export type shelly_button_event_t =
  | 'single_push'
  | 'double_push'
  | 'long_push'
  | 'triple_push';

export type shelly_button_status_t = {};

export type shelly_button_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  meta: null | Record<string, unknown>;
};

export type shelly_button_rpc_method_map_t = {
  'Button.GetStatus': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
        };
    result: shelly_button_status_t;
  };
  'Button.SetConfig': {
    params:
      | {
          id: shelly_component_id_t;
          config: shelly_button_config_t;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
          config: shelly_button_config_t;
        };
    result: {
      restart_required: boolean;
    };
  };
  'Button.GetConfig': {
    params:
      | {
          id: shelly_component_id_t;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
        };
    result: shelly_button_config_t;
  };
  'Button.Trigger': {
    params:
      | {
          id: shelly_component_id_t;
          event: shelly_button_event_t;
        }
      | {
          role: shelly_service_role_t;
          owner: shelly_service_key_t;
          event: shelly_button_event_t;
        };
    result: null;
  };
};
