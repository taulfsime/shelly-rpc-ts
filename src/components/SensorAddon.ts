import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_humidity_key_t } from './Humidity.js';
import { shelly_input_key_t } from './Input.js';
import { shelly_temperature_key_t } from './Temperature.js';
import { shelly_voltmeter_key_t } from './Voltmeter.js';

type shelly_sensor_addon_peripheral_ds18b20_t = 'ds18b20';
type shelly_sensor_addon_peripheral_dht22_t = 'dht22';
type shelly_sensor_addon_peripheral_digital_in_t = 'digital_in';
type shelly_sensor_addon_peripheral_analog_in_t = 'analog_in';
type shelly_sensor_addon_peripheral_voltmeter_t = 'voltmeter';

export type shelly_sensor_addon_config_type_t = 'sensor';

export type shelly_sensor_addon_peripheral_type_t =
  | shelly_sensor_addon_peripheral_ds18b20_t
  | shelly_sensor_addon_peripheral_dht22_t
  | shelly_sensor_addon_peripheral_digital_in_t
  | shelly_sensor_addon_peripheral_analog_in_t
  | shelly_sensor_addon_peripheral_voltmeter_t;

type shelly_sensor_addon_rpc_add_peripheral_params_base_t = {
  type: Exclude<
    shelly_sensor_addon_peripheral_type_t,
    shelly_sensor_addon_peripheral_ds18b20_t
  >;
  attrs?: {
    cid?: shelly_component_id_t;
  };
};

type shelly_sensor_addon_rpc_add_peripheral_params_ds18b20_t = {
  type: shelly_sensor_addon_peripheral_ds18b20_t;
  attrs: {
    cid?: shelly_component_id_t;
    addr: string;
  };
};

export type shelly_sensor_addon_rpc_method_map_t = {
  'SensorAddon.AddPeripheral': {
    params:
      | shelly_sensor_addon_rpc_add_peripheral_params_base_t
      | shelly_sensor_addon_rpc_add_peripheral_params_ds18b20_t;
    result: {
      [
        key:
          | shelly_temperature_key_t
          | shelly_humidity_key_t
          | shelly_input_key_t
          | shelly_voltmeter_key_t
      ]: {};
    };
  };
  'SensorAddon.GetPeripherals': {
    params: never;
    result: {
      [key in shelly_sensor_addon_peripheral_ds18b20_t]?: {
        [key in shelly_temperature_key_t]?: {
          addr: string;
        };
      };
    } & {
      [key in shelly_sensor_addon_peripheral_dht22_t]?: {
        [key in shelly_temperature_key_t | shelly_humidity_key_t]?: {};
      };
    } & {
      [key in
        | shelly_sensor_addon_peripheral_analog_in_t
        | shelly_sensor_addon_peripheral_digital_in_t]?: {
        [key in shelly_input_key_t]?: {};
      };
    } & {
      [key in shelly_sensor_addon_peripheral_voltmeter_t]?: {
        [key in shelly_voltmeter_key_t]?: {};
      };
    };
  };
  'SensorAddon.RemovePeripheral': {
    params: {
      component:
        | shelly_temperature_key_t
        | shelly_humidity_key_t
        | shelly_input_key_t
        | shelly_voltmeter_key_t;
    };
    result: null;
  };
  'SensorAddon.UpdatePeripheral': {
    params: {
      component: shelly_temperature_key_t;
      attrs: {
        addr: string;
      };
    };
  };
  'SensorAddon.OneWireScan': {
    params: never;
    result: {
      devices: {
        type: shelly_sensor_addon_peripheral_ds18b20_t | 'unknown';
        addr: string;
        component: shelly_temperature_key_t | null;
      }[];
    };
  };
};
