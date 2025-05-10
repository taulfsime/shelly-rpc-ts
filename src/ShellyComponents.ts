import { shelly_ble_config_t, shelly_ble_status_t } from './components/BLE.js';
import {
  shelly_boolean_config_t,
  shelly_boolean_status_t,
} from './components/VirtualComponents/Boolean.js';
import {
  shelly_bthomedevice_config_t,
  shelly_bthomedevice_status_t,
} from './components/BTHomeComponents/BTHomeDevice.js';
import {
  shelly_bthomesensor_config_t,
  shelly_bthomesensor_status_t,
} from './components/BTHomeComponents/BTHomeSensor.js';
import { shelly_cct_config_t, shelly_cct_status_t } from './components/CCT.js';
import {
  shelly_cloud_config_t,
  shelly_cloud_status_t,
} from './components/Cloud.js';
import {
  shelly_cover_config_t,
  shelly_cover_status_t,
} from './components/Cover.js';
import {
  shelly_dali_config_t,
  shelly_dali_status_t,
} from './components/DALI.js';
import {
  shelly_devicepower_config_t,
  shelly_devicepower_status_t,
} from './components/DevicePower.js';
import { shelly_em_config_t, shelly_em_status_t } from './components/EM.js';
import { shelly_em1_config_t, shelly_em1_status_t } from './components/EM1.js';
import {
  shelly_emdata_config_t,
  shelly_emdata_status_t,
} from './components/EMData.js';
import {
  shelly_enum_config_t,
  shelly_enum_status_t,
} from './components/VirtualComponents/Enum.js';
import {
  shelly_ethernet_config_t,
  shelly_ethernet_status_t,
} from './components/Ethernet.js';
import {
  shelly_group_config_t,
  shelly_group_status_t,
} from './components/VirtualComponents/Group.js';
import {
  shelly_humidity_config_t,
  shelly_humidity_status_t,
} from './components/Humidity.js';
import {
  shelly_input_config_t,
  shelly_input_status_t,
} from './components/Input.js';
import { shelly_knx_config_t, shelly_knx_status_t } from './components/KNX.js';
import {
  shelly_light_config_t,
  shelly_light_status_t,
} from './components/Light.js';
import {
  shelly_matter_config_t,
  shelly_matter_status_t,
} from './components/Matter.js';
import {
  shelly_modbus_config_t,
  shelly_modbus_status_t,
} from './components/Modbus.js';
import {
  shelly_mqtt_config_t,
  shelly_mqtt_status_t,
} from './components/MQTT.js';
import {
  shelly_number_config_t,
  shelly_number_status_t,
} from './components/VirtualComponents/Number.js';
import {
  shelly_object_config_t,
  shelly_object_status_t,
} from './components/VirtualComponents/Object.js';
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
  shelly_smoke_config_t,
  shelly_smoke_status_t,
} from './components/Smoke.js';
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
} from './components/VirtualComponents/Text.js';
import { shelly_virtual_component_type_t } from './components/Virtual.js';
import {
  shelly_voltmeter_config_t,
  shelly_voltmeter_status_t,
} from './components/Voltmeter.js';
import {
  shelly_wifi_config_t,
  shelly_wifi_status_t,
} from './components/WiFi.js';
import { shelly_ws_config_t, shelly_ws_status_t } from './components/WS.js';
import {
  shelly_zigbee_config_t,
  shelly_zigbee_status_t,
} from './components/Zigbee.js';
import {
  shelly_bthome_component_type_t,
  shelly_bthome_config_t,
  shelly_bthome_status_t,
} from './components/BTHome.js';
import {
  shelly_em1data_config_t,
  shelly_em1data_status_t,
} from './components/EM1Data.js';
import { shelly_rgb_config_t, shelly_rgb_status_t } from './components/RGB.js';
import {
  shelly_rgbw_config_t,
  shelly_rgbw_status_t,
} from './components/RGBW.js';

type shelly_component_single_instance_t =
  | 'sys'
  | 'wifi'
  | 'mqtt'
  | 'ethernet'
  | 'ble'
  | 'cloud'
  | 'ws'
  | 'matter'
  | 'modbus'
  | 'dali'
  | 'zigbee'
  | 'knx'
  | 'http';

type shelly_component_multi_instance_t =
  | shelly_virtual_component_type_t
  | shelly_bthome_component_type_t
  | 'switch'
  | 'cover'
  | 'light'
  | 'service'
  | 'script'
  | 'temperature'
  | 'humidity'
  | 'input'
  | 'pm1'
  | 'devicepower'
  | 'voltmeter'
  | 'smoke'
  | 'cct'
  | 'em'
  | 'em1'
  | 'emdata'
  | 'em1data'
  | 'rgb'
  | 'rgbw';

type shelly_component_key_helper_t<K extends shelly_component_type_t> =
  K extends shelly_component_single_instance_t
    ? K
    : `${K}:${shelly_component_id_t}`;

export type shelly_component_id_t = number;
export type shelly_component_type_t =
  | shelly_component_single_instance_t
  | shelly_component_multi_instance_t;

export type shelly_component_key_t =
  shelly_component_key_helper_t<shelly_component_type_t>;

export type shelly_component_info_map_t = {
  sys: {
    config: shelly_sys_config_t;
    status: shelly_sys_status_t;
  };
  wifi: {
    config: shelly_wifi_config_t;
    status: shelly_wifi_status_t;
  };
  mqtt: {
    config: shelly_mqtt_config_t;
    status: shelly_mqtt_status_t;
  };
  ethernet: {
    config: shelly_ethernet_config_t;
    status: shelly_ethernet_status_t;
  };
  ble: {
    config: shelly_ble_config_t;
    status: shelly_ble_status_t;
  };
  cloud: {
    config: shelly_cloud_config_t;
    status: shelly_cloud_status_t;
  };
  ws: {
    config: shelly_ws_config_t;
    status: shelly_ws_status_t;
  };
  matter: {
    config: shelly_matter_config_t;
    status: shelly_matter_status_t;
  };
  modbus: {
    config: shelly_modbus_config_t;
    status: shelly_modbus_status_t;
  };
  dali: {
    config: shelly_dali_config_t;
    status: shelly_dali_status_t;
  };
  zigbee: {
    config: shelly_zigbee_config_t;
    status: shelly_zigbee_status_t;
  };
  knx: {
    config: shelly_knx_config_t;
    status: shelly_knx_status_t;
  };
  bthome: {
    config: shelly_bthome_config_t;
    status: shelly_bthome_status_t;
  };
} & {
  [key: shelly_component_key_helper_t<'number'>]: {
    config: shelly_number_config_t;
    status: shelly_number_status_t;
  };
  [key: shelly_component_key_helper_t<'boolean'>]: {
    config: shelly_boolean_config_t;
    status: shelly_boolean_status_t;
  };
  [key: shelly_component_key_helper_t<'text'>]: {
    config: shelly_text_config_t;
    status: shelly_text_status_t;
  };
  [key: shelly_component_key_helper_t<'object'>]: {
    config: shelly_object_config_t;
    status: shelly_object_status_t;
  };
  [key: shelly_component_key_helper_t<'enum'>]: {
    config: shelly_enum_config_t;
    status: shelly_enum_status_t;
  };
  [key: shelly_component_key_helper_t<'bthomesensor'>]: {
    config: shelly_bthomesensor_config_t;
    status: shelly_bthomesensor_status_t;
  };
  [key: shelly_component_key_helper_t<'bthomedevice'>]: {
    config: shelly_bthomedevice_config_t;
    status: shelly_bthomedevice_status_t;
  };
  [key: shelly_component_key_helper_t<'group'>]: {
    config: shelly_group_config_t;
    status: shelly_group_status_t;
  };
  [key: shelly_component_key_helper_t<'switch'>]: {
    config: shelly_switch_config_t;
    status: shelly_switch_status_t;
  };
  [key: shelly_component_key_helper_t<'cover'>]: {
    config: shelly_cover_config_t;
    status: shelly_cover_status_t;
  };
  [key: shelly_component_key_helper_t<'light'>]: {
    config: shelly_light_config_t;
    status: shelly_light_status_t;
  };
  [key: shelly_component_key_helper_t<'service'>]: {
    config: shelly_service_config_t;
    status: shelly_service_status_t;
  };
  [key: shelly_component_key_helper_t<'script'>]: {
    config: shelly_script_config_t;
    status: shelly_script_status_t;
  };
  [key: shelly_component_key_helper_t<'temperature'>]: {
    config: shelly_temperature_config_t;
    status: shelly_temperature_status_t;
  };
  [key: shelly_component_key_helper_t<'humidity'>]: {
    config: shelly_humidity_config_t;
    status: shelly_humidity_status_t;
  };
  [key: shelly_component_key_helper_t<'input'>]: {
    config: shelly_input_config_t;
    status: shelly_input_status_t;
  };
  [key: shelly_component_key_helper_t<'pm1'>]: {
    config: shelly_pm1_config_t;
    status: shelly_pm1_status_t;
  };
  [key: shelly_component_key_helper_t<'devicepower'>]: {
    config: shelly_devicepower_config_t;
    status: shelly_devicepower_status_t;
  };
  [key: shelly_component_key_helper_t<'voltmeter'>]: {
    config: shelly_voltmeter_config_t;
    status: shelly_voltmeter_status_t;
  };
  [key: shelly_component_key_helper_t<'smoke'>]: {
    config: shelly_smoke_config_t;
    status: shelly_smoke_status_t;
  };
  [key: shelly_component_key_helper_t<'cct'>]: {
    config: shelly_cct_config_t;
    status: shelly_cct_status_t;
  };
  [key: shelly_component_key_helper_t<'em'>]: {
    config: shelly_em_config_t;
    status: shelly_em_status_t;
  };
  [key: shelly_component_key_helper_t<'em1'>]: {
    config: shelly_em1_config_t;
    status: shelly_em1_status_t;
  };
  [key: shelly_component_key_helper_t<'emdata'>]: {
    config: shelly_emdata_config_t;
    status: shelly_emdata_status_t;
  };
  [key: shelly_component_key_helper_t<'em1data'>]: {
    config: shelly_em1data_config_t;
    status: shelly_em1data_status_t;
  };
  [key: shelly_component_key_helper_t<'rgb'>]: {
    config: shelly_rgb_config_t;
    status: shelly_rgb_status_t;
  };
  [key: shelly_component_key_helper_t<'rgbw'>]: {
    config: shelly_rgbw_config_t;
    status: shelly_rgbw_status_t;
  };
};
// vasi haly

export function parseComponentKey(key: shelly_component_key_t): {
  type: shelly_component_type_t;
  id?: shelly_component_id_t;
} {
  const [type, id] = key.split(':', 2);

  if (type.length === key.length) {
    return { type: type as shelly_component_type_t };
  }

  return {
    type: type as shelly_component_type_t,
    id: parseInt(id, 10) as shelly_component_id_t,
  };
}
