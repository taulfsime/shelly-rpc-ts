import { shelly_boolean_rpc_method_map_t } from './components/Boolean.js';
import { shelly_bthomedevice_rpc_method_map_t } from './components/BTHomeDevice.js';
import { shelly_bthomesensor_rpc_method_map_t } from './components/BTHomeSensor.js';
import { shelly_button_rpc_method_map_t } from './components/Button.js';
import { shelly_cover_rpc_method_map_t } from './components/Cover.js';
import { shelly_enum_rpc_method_map_t } from './components/Enum.js';
import { shelly_group_rpc_method_map_t } from './components/Group.js';
import { shelly_humidity_rpc_method_map_t } from './components/Humidity.js';
import { shelly_input_rpc_method_map_t } from './components/Input.js';
import { shelly_light_rpc_method_map_t } from './components/Light.js';
import { shelly_mqtt_rpc_method_map_t } from './components/MQTT.js';
import { shelly_number_rpc_method_map_t } from './components/Number.js';
import { shelly_script_rpc_method_map_t } from './components/Script.js';
import { shelly_service_rpc_method_map_t } from './components/Service.js';
import { shelly_switch_rpc_method_map_t } from './components/Switch.js';
import { shelly_sys_rpc_method_map_t } from './components/Sys.js';
import { shelly_temperature_rpc_method_map_t } from './components/Temperature.js';
import { shelly_text_rpc_method_map_t } from './components/Text.js';
import { shelly_wifi_rpc_method_map_t } from './components/WiFi.js';
import { shelly_device_rpc_method_map_t } from './Shelly.js';

type shelly_component_single_instance_t = 'sys' | 'wifi' | 'mqtt';

type shelly_component_multi_instance_t =
  | 'switch'
  | 'cover'
  | 'light'
  | 'service'
  | 'number'
  | 'boolean'
  | 'text'
  | 'object'
  | 'enum'
  | 'script'
  | 'temperature'
  | 'humidity'
  | 'input'
  | 'bthomesensor'
  | 'bthomedevice'
  | 'pm1'
  | 'group';

export type shelly_component_id_t = number;
export type shelly_component_type_t =
  | shelly_component_single_instance_t
  | shelly_component_multi_instance_t;

export type shelly_component_key_t =
  | shelly_component_single_instance_t
  | `${shelly_component_multi_instance_t}:${shelly_component_id_t}`;

type shelly_rpc_method_map_t = shelly_device_rpc_method_map_t &
  shelly_sys_rpc_method_map_t &
  shelly_wifi_rpc_method_map_t &
  shelly_mqtt_rpc_method_map_t &
  shelly_switch_rpc_method_map_t &
  shelly_cover_rpc_method_map_t &
  shelly_light_rpc_method_map_t &
  shelly_service_rpc_method_map_t &
  shelly_number_rpc_method_map_t &
  shelly_boolean_rpc_method_map_t &
  shelly_text_rpc_method_map_t &
  shelly_enum_rpc_method_map_t &
  shelly_button_rpc_method_map_t &
  shelly_group_rpc_method_map_t &
  shelly_script_rpc_method_map_t &
  shelly_temperature_rpc_method_map_t &
  shelly_humidity_rpc_method_map_t &
  shelly_input_rpc_method_map_t &
  shelly_bthomesensor_rpc_method_map_t &
  shelly_bthomedevice_rpc_method_map_t;

export type shelly_rpc_method_t = keyof shelly_rpc_method_map_t;

export type shelly_rpc_method_params_t<K extends shelly_rpc_method_t> =
  K extends keyof shelly_rpc_method_map_t
    ? shelly_rpc_method_map_t[K] extends { params: infer P }
      ? P
      : shelly_rpc_method_map_t[K] extends { params?: infer P }
        ? P | undefined
        : never
    : never;

export type shelly_rpc_method_result_t<K extends shelly_rpc_method_t> =
  K extends keyof shelly_rpc_method_map_t
    ? shelly_rpc_method_map_t[K] extends { result: infer R }
      ? R
      : unknown
    : unknown;

export type shelly_rpc_method_response_t<K extends shelly_rpc_method_t> =
  | {
      id: string | number;
      src: string;
      dst: string;
      result: shelly_rpc_method_result_t<K>;
    }
  | {
      id: string | number;
      src: string;
      dst: string;
      error: {
        code: number;
        message: string;
      };
    };
