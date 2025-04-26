import { shelly_component_id_t, shelly_component_key_t } from '../ShellyRpc';

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
          role: string;
          owner: shelly_component_key_t;
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
          role: string;
          owner: shelly_component_key_t;
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
          role: string;
          owner: shelly_component_key_t;
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
          role: string;
          owner: shelly_component_key_t;
          event: shelly_button_event_t;
        };
    result: null;
  };
};
