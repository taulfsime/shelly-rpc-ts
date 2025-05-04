import { shelly_ble_config_t, shelly_ble_status_t } from './components/BLE.js';
import {
  shelly_boolean_config_t,
  shelly_boolean_status_t,
} from './components/Boolean.js';
import {
  shelly_bthomedevice_config_t,
  shelly_bthomedevice_status_t,
} from './components/BTHomeDevice.js';
import {
  shelly_bthomesensor_config_t,
  shelly_bthomesensor_status_t,
} from './components/BTHomeSensor.js';
import {
  shelly_cloud_config_t,
  shelly_cloud_status_t,
} from './components/Cloud.js';
import {
  shelly_cover_config_t,
  shelly_cover_status_t,
} from './components/Cover.js';
import {
  shelly_devicepower_config_t,
  shelly_devicepower_status_t,
} from './components/DevicePower.js';
import {
  shelly_enum_config_t,
  shelly_enum_status_t,
} from './components/Enum.js';
import {
  shelly_ethernet_config_t,
  shelly_ethernet_status_t,
} from './components/Ethernet.js';
import {
  shelly_group_config_t,
  shelly_group_status_t,
} from './components/Group.js';
import {
  shelly_humidity_config_t,
  shelly_humidity_status_t,
} from './components/Humidity.js';
import {
  shelly_input_config_t,
  shelly_input_status_t,
} from './components/Input.js';
import {
  shelly_light_config_t,
  shelly_light_status_t,
} from './components/Light.js';
import {
  shelly_mqtt_config_t,
  shelly_mqtt_status_t,
} from './components/MQTT.js';
import {
  shelly_number_config_t,
  shelly_number_status_t,
} from './components/Number.js';
import {
  shelly_object_config_t,
  shelly_object_status_t,
} from './components/Object.js';
import { shelly_pm1_config_t, shelly_pm1_status_t } from './components/PM1.js';
import {
  shelly_script_config_t,
  shelly_script_status_t,
} from './components/Script.js';
import {
  shelly_service_config_t,
  shelly_service_status_t,
} from './components/Service.js';
import {
  shelly_switch_config_t,
  shelly_switch_status_t,
} from './components/Switch.js';
import { shelly_sys_config_t, shelly_sys_status_t } from './components/Sys.js';
import {
  shelly_temperature_config_t,
  shelly_temperature_status_t,
} from './components/Temperature.js';
import {
  shelly_text_config_t,
  shelly_text_status_t,
} from './components/Text.js';
import {
  shelly_wifi_config_t,
  shelly_wifi_status_t,
} from './components/WiFi.js';

type shelly_component_single_instance_t =
  | 'sys'
  | 'wifi'
  | 'mqtt'
  | 'ethernet'
  | 'ble'
  | 'cloud';

type shelly_component_virtual_instance_t =
  | 'number'
  | 'boolean'
  | 'text'
  | 'object'
  | 'enum'
  | 'bthomesensor'
  | 'bthomedevice'
  | 'group';

type shelly_component_multi_instance_t =
  | shelly_component_virtual_instance_t
  | 'switch'
  | 'cover'
  | 'light'
  | 'service'
  | 'script'
  | 'temperature'
  | 'humidity'
  | 'input'
  | 'pm1'
  | 'devicepower';

type shelly_component_key_helper<K extends shelly_component_type_t> =
  K extends shelly_component_single_instance_t
    ? K
    : `${K}:${shelly_component_id_t}`;

export type shelly_component_id_t = number;
export type shelly_component_type_t =
  | shelly_component_single_instance_t
  | shelly_component_multi_instance_t;

export type shelly_component_key_t = shelly_component_key_helper<
  shelly_component_multi_instance_t | shelly_component_single_instance_t
>;

export type shelly_component_status_map_t = {
  sys: shelly_sys_status_t;
  wifi: shelly_wifi_status_t;
  mqtt: shelly_mqtt_status_t;
  ethernet: shelly_ethernet_status_t;
  ble: shelly_ble_status_t;
  config: shelly_cloud_status_t;
} & {
  [key: shelly_component_key_helper<'number'>]: shelly_number_status_t;
  [key: shelly_component_key_helper<'boolean'>]: shelly_boolean_status_t;
  [key: shelly_component_key_helper<'text'>]: shelly_text_status_t;
  [key: shelly_component_key_helper<'object'>]: shelly_object_status_t;
  [key: shelly_component_key_helper<'enum'>]: shelly_enum_status_t;
  [
    key: shelly_component_key_helper<'bthomesensor'>
  ]: shelly_bthomesensor_status_t;
  [
    key: shelly_component_key_helper<'bthomedevice'>
  ]: shelly_bthomedevice_status_t;
  [key: shelly_component_key_helper<'group'>]: shelly_group_status_t;
  [key: shelly_component_key_helper<'switch'>]: shelly_switch_status_t;
  [key: shelly_component_key_helper<'cover'>]: shelly_cover_status_t;
  [key: shelly_component_key_helper<'light'>]: shelly_light_status_t;
  [key: shelly_component_key_helper<'service'>]: shelly_service_status_t;
  [key: shelly_component_key_helper<'script'>]: shelly_script_status_t;
  [
    key: shelly_component_key_helper<'temperature'>
  ]: shelly_temperature_status_t;
  [key: shelly_component_key_helper<'humidity'>]: shelly_humidity_status_t;
  [key: shelly_component_key_helper<'input'>]: shelly_input_status_t;
  [key: shelly_component_key_helper<'pm1'>]: shelly_pm1_status_t;
  [
    key: shelly_component_key_helper<'devicepower'>
  ]: shelly_devicepower_status_t;
};

export type shelly_component_config_map_t = {
  sys: shelly_sys_config_t;
  wifi: shelly_wifi_config_t;
  mqtt: shelly_mqtt_config_t;
  ethernet: shelly_ethernet_config_t;
  ble: shelly_ble_config_t;
  cloud: shelly_cloud_config_t;
} & {
  [key: shelly_component_key_helper<'number'>]: shelly_number_config_t;
  [key: shelly_component_key_helper<'boolean'>]: shelly_boolean_config_t;
  [key: shelly_component_key_helper<'text'>]: shelly_text_config_t;
  [key: shelly_component_key_helper<'object'>]: shelly_object_config_t;
  [key: shelly_component_key_helper<'enum'>]: shelly_enum_config_t;
  [
    key: shelly_component_key_helper<'bthomesensor'>
  ]: shelly_bthomesensor_config_t;
  [
    key: shelly_component_key_helper<'bthomedevice'>
  ]: shelly_bthomedevice_config_t;
  [key: shelly_component_key_helper<'group'>]: shelly_group_config_t;
  [key: shelly_component_key_helper<'switch'>]: shelly_switch_config_t;
  [key: shelly_component_key_helper<'cover'>]: shelly_cover_config_t;
  [key: shelly_component_key_helper<'light'>]: shelly_light_config_t;
  [key: shelly_component_key_helper<'service'>]: shelly_service_config_t;
  [key: shelly_component_key_helper<'script'>]: shelly_script_config_t;
  [
    key: shelly_component_key_helper<'temperature'>
  ]: shelly_temperature_config_t;
  [key: shelly_component_key_helper<'humidity'>]: shelly_humidity_config_t;
  [key: shelly_component_key_helper<'input'>]: shelly_input_config_t;
  [key: shelly_component_key_helper<'pm1'>]: shelly_pm1_config_t;
  [
    key: shelly_component_key_helper<'devicepower'>
  ]: shelly_devicepower_config_t;
};

// vasi haly
