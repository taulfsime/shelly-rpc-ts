import {
  shelly_component_id_t,
  shelly_component_key_t,
} from '../ShellyComponents.js';
import { shelly_boolean_config_t } from './VirtualComponents/Boolean.js';
import { shelly_button_config_t } from './VirtualComponents/Button.js';
import { shelly_enum_config_t } from './VirtualComponents/Enum.js';
import { shelly_group_config_t } from './VirtualComponents/Group.js';
import { shelly_number_config_t } from './VirtualComponents/Number.js';
import { shelly_text_config_t } from './VirtualComponents/Text.js';

type shelly_user_virtual_component_type_t =
  | 'boolean'
  | 'text'
  | 'number'
  | 'enum'
  | 'group'
  | 'button';

export type shelly_virtual_component_type_t =
  | shelly_user_virtual_component_type_t
  | 'object';

export type shelly_virtual_rpc_method_map_t = {
  'Virtual.Add': {
    params: {
      type: shelly_user_virtual_component_type_t;
      config?:
        | shelly_boolean_config_t
        | shelly_text_config_t
        | shelly_number_config_t
        | shelly_enum_config_t
        | shelly_group_config_t
        | shelly_button_config_t;
      id?: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'Virtual.Delete': {
    params: {
      key: shelly_component_key_t;
    };
    result: null;
  };
};
