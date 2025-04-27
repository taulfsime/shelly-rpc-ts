import { shelly_device_rpc_method_map_t } from './Shelly';
import { shelly_sys_rpc_method_map_t } from './components/Sys';
import { shelly_wifi_rpc_method_map_t } from './components/WiFi';
import { shelly_mqtt_rpc_method_map_t } from './components/MQTT';
import { shelly_switch_rpc_method_map_t } from './components/Switch';
import { shelly_cover_rpc_method_map_t } from './components/Cover';
import { shelly_light_rpc_method_map_t } from './components/Light';
import { shelly_service_rpc_method_map_t } from './components/Service';
import { shelly_number_rpc_method_map_t } from './components/Number';
import { shelly_boolean_rpc_method_map_t } from './components/Boolean';
import { shelly_text_rpc_method_map_t } from './components/Text';
import { shelly_enum_rpc_method_map_t } from './components/Enum';
import { shelly_button_rpc_method_map_t } from './components/Button';
import { shelly_group_rpc_method_map_t } from './components/Group';
import { shelly_script_rpc_method_map_t } from './components/Script';
import { shelly_temperature_rpc_method_map_t } from './components/Temperature';
import { shelly_humidity_rpc_method_map_t } from './components/Humidity';
import { shelly_input_rpc_method_map_t } from './components/Input';

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
  shelly_input_rpc_method_map_t;

type shelly_rpc_method_t = keyof shelly_rpc_method_map_t;

type shelly_rpc_method_params_t<K extends shelly_rpc_method_t> =
  K extends keyof shelly_rpc_method_map_t
    ? shelly_rpc_method_map_t[K] extends { params: infer P }
      ? P
      : shelly_rpc_method_map_t[K] extends { params?: infer P }
        ? P | undefined
        : never
    : never;

export type shelly_rpc_method_result_t<K extends shelly_rpc_method_t> =
  K extends keyof shelly_rpc_method_map_t
    ? shelly_rpc_method_map_t[K]['result']
    : null;

export type shelly_rpc_method_response_t<K extends shelly_rpc_method_t> =
  | {
      id: shelly_rpc_request_id_t;
      src: string;
      dst: string;
      result: shelly_rpc_method_result_t<K>;
    }
  | {
      id: shelly_rpc_request_id_t;
      src: string;
      dst: string;
      error: {
        code: number;
        message: string;
      };
    };
