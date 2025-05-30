import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_switch_key_t } from './Switch.js';

type shelly_pro_output_addon_peripheral_digital_out_t = 'digital_out';

export type shelly_pro_output_addon_config_type_t = 'prooutput';

export type shelly_pro_sensor_addon_peripheral_type_t =
  shelly_pro_output_addon_peripheral_digital_out_t;

export type shelly_pro_output_addon_rpc_method_map_t = {
  'ProOutputAddon.AddPeripheral': {
    params: {
      type: shelly_pro_sensor_addon_peripheral_type_t;
      attrs?: {
        cid?: shelly_component_id_t;
      };
    };
    result: {
      [key in shelly_switch_key_t]: {};
    };
  };
  'ProOutputAddon.GetPeripherals': {
    params: never;
    result: {
      [key in shelly_pro_output_addon_peripheral_digital_out_t]: {
        [key in shelly_switch_key_t]?: {};
      };
    };
  };
  'ProOutputAddon.RemovePeripheral': {
    params: {
      component: shelly_switch_key_t;
    };
    result: null;
  };
};
