import { shelly_component_id_t } from '../../ShellyComponents.js';
import { optional_recursive_t } from '../helpers.js';

export type shelly_ir_type_t = 'ir';
export type shelly_ir_key_t = shelly_ir_type_t;

export type shelly_ir_config_t = {};

export type shelly_ir_status_t = {};

export type shelly_ir_rpc_method_map_t = {
  'IR.GetStatus': {
    params?: {};
    result: shelly_ir_status_t;
  };
  'IR.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_ir_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'IR.GetConfig': {
    params?: {};
    result: shelly_ir_config_t;
  };
  'IR.AddDevice': {
    params: {
      config: {
        name: string;
      };
      id?: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'IR.DeleteDevice': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};
