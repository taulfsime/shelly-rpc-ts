import {
  shelly_component_id_t,
  shelly_component_key_t,
} from '../ShellyComponents.js';
import { shelly_service_role_t } from './Service.js';
import {
  shelly_boolean_config_t,
  shelly_boolean_key_t,
  shelly_boolean_type_t,
} from './VirtualComponents/Boolean.js';
import {
  shelly_button_config_t,
  shelly_button_key_t,
  shelly_button_type_t,
} from './VirtualComponents/Button.js';
import {
  shelly_enum_config_t,
  shelly_enum_key_t,
  shelly_enum_type_t,
} from './VirtualComponents/Enum.js';
import {
  shelly_group_config_t,
  shelly_group_key_t,
  shelly_group_type_t,
} from './VirtualComponents/Group.js';
import {
  shelly_number_config_t,
  shelly_number_key_t,
  shelly_number_type_t,
} from './VirtualComponents/Number.js';
import {
  shelly_text_config_t,
  shelly_text_key_t,
  shelly_text_type_t,
} from './VirtualComponents/Text.js';

export type shelly_virtual_component_status_source_t =
  | ''
  | 'rpc'
  | 'sys'
  | 'err';

export type shelly_virtual_component_key_t =
  | shelly_boolean_key_t
  | shelly_button_key_t
  | shelly_enum_key_t
  | shelly_group_key_t
  | shelly_number_key_t
  | shelly_text_key_t;

type shelly_virtual_rpc_add_params_t =
  | {
      type: shelly_boolean_type_t;
      config: shelly_boolean_config_t;
    }
  | {
      type: shelly_button_type_t;
      config: shelly_button_config_t;
    }
  | {
      type: shelly_enum_type_t;
      config: shelly_enum_config_t;
    }
  | {
      type: shelly_group_type_t;
      config: shelly_group_config_t;
    }
  | {
      type: shelly_number_type_t;
      config: shelly_number_config_t;
    }
  | {
      type: shelly_text_type_t;
      config: shelly_text_config_t;
    };

export type shelly_virtual_rpc_method_map_t = {
  'Virtual.Add': {
    params: shelly_virtual_rpc_add_params_t & {
      id?: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'Virtual.Delete': {
    params: {
      key: shelly_virtual_component_key_t;
    };
    result: null;
  };
};

export type shelly_virtual_attrs_t = {
  role: shelly_service_role_t;
  owner: shelly_component_key_t;
};
