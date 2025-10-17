import {
  shelly_ble_config_t,
  shelly_ble_key_t,
  shelly_ble_status_t,
  shelly_ble_type_t,
} from './components/BLE.js';
import {
  shelly_boolean_config_t,
  shelly_boolean_key_t,
  shelly_boolean_status_t,
  shelly_boolean_type_t,
} from './components/VirtualComponents/Boolean.js';
import {
  shelly_bthomedevice_attrs_t,
  shelly_bthomedevice_config_t,
  shelly_bthomedevice_key_t,
  shelly_bthomedevice_status_t,
  shelly_bthomedevice_type_t,
} from './components/BTHomeComponents/BTHomeDevice.js';
import {
  shelly_bthomesensor_config_t,
  shelly_bthomesensor_key_t,
  shelly_bthomesensor_status_t,
  shelly_bthomesensor_type_t,
} from './components/BTHomeComponents/BTHomeSensor.js';
import {
  shelly_cct_config_t,
  shelly_cct_key_t,
  shelly_cct_status_t,
  shelly_cct_type_t,
} from './components/CCT.js';
import {
  shelly_cloud_config_t,
  shelly_cloud_key_t,
  shelly_cloud_status_t,
  shelly_cloud_type_t,
} from './components/Cloud.js';
import {
  shelly_cover_config_t,
  shelly_cover_key_t,
  shelly_cover_status_t,
  shelly_cover_type_t,
} from './components/Cover.js';
import {
  shelly_dali_config_t,
  shelly_dali_key_t,
  shelly_dali_status_t,
  shelly_dali_type_t,
} from './components/DALI.js';
import {
  shelly_devicepower_config_t,
  shelly_devicepower_key_t,
  shelly_devicepower_status_t,
  shelly_devicepower_type_t,
} from './components/DevicePower.js';
import {
  shelly_em_config_t,
  shelly_em_key_t,
  shelly_em_status_t,
  shelly_em_type_t,
} from './components/EM.js';
import {
  shelly_em1_config_t,
  shelly_em1_key_t,
  shelly_em1_status_t,
  shelly_em1_type_t,
} from './components/EM1.js';
import {
  shelly_emdata_config_t,
  shelly_emdata_key_t,
  shelly_emdata_status_t,
  shelly_emdata_type_t,
} from './components/EMData.js';
import {
  shelly_enum_config_t,
  shelly_enum_key_t,
  shelly_enum_status_t,
  shelly_enum_type_t,
} from './components/VirtualComponents/Enum.js';
import {
  shelly_ethernet_config_t,
  shelly_ethernet_key_t,
  shelly_ethernet_status_t,
  shelly_ethernet_type_t,
} from './components/Ethernet.js';
import {
  shelly_group_config_t,
  shelly_group_key_t,
  shelly_group_status_t,
  shelly_group_type_t,
} from './components/VirtualComponents/Group.js';
import {
  shelly_humidity_config_t,
  shelly_humidity_key_t,
  shelly_humidity_status_t,
  shelly_humidity_type_t,
} from './components/Humidity.js';
import {
  shelly_input_config_t,
  shelly_input_key_t,
  shelly_input_status_t,
  shelly_input_type_t,
} from './components/Input.js';
import {
  shelly_knx_config_t,
  shelly_knx_key_t,
  shelly_knx_status_t,
  shelly_knx_type_t,
} from './components/KNX.js';
import {
  shelly_light_config_t,
  shelly_light_key_t,
  shelly_light_status_t,
  shelly_light_type_t,
} from './components/Light.js';
import {
  shelly_matter_config_t,
  shelly_matter_key_t,
  shelly_matter_status_t,
  shelly_matter_type_t,
} from './components/Matter.js';
import {
  shelly_modbus_config_t,
  shelly_modbus_key_t,
  shelly_modbus_status_t,
  shelly_modbus_type_t,
} from './components/Modbus.js';
import {
  shelly_mqtt_config_t,
  shelly_mqtt_key_t,
  shelly_mqtt_status_t,
  shelly_mqtt_type_t,
} from './components/MQTT.js';
import {
  shelly_number_config_t,
  shelly_number_key_t,
  shelly_number_status_t,
  shelly_number_type_t,
} from './components/VirtualComponents/Number.js';
import {
  shelly_object_config_t,
  shelly_object_key_t,
  shelly_object_status_t,
  shelly_object_type_t,
} from './components/VirtualComponents/Object.js';
import {
  shelly_pm1_config_t,
  shelly_pm1_key_t,
  shelly_pm1_status_t,
  shelly_pm1_type_t,
} from './components/PM1.js';
import {
  shelly_script_config_t,
  shelly_script_key_t,
  shelly_script_status_t,
  shelly_script_type_t,
} from './components/Script.js';
import {
  shelly_service_config_t,
  shelly_service_key_t,
  shelly_service_status_t,
  shelly_service_type_t,
} from './components/Service.js';
import {
  shelly_smoke_config_t,
  shelly_smoke_key_t,
  shelly_smoke_status_t,
  shelly_smoke_type_t,
} from './components/Smoke.js';
import {
  shelly_switch_config_t,
  shelly_switch_key_t,
  shelly_switch_status_t,
  shelly_switch_type_t,
} from './components/Switch.js';
import {
  shelly_sys_config_t,
  shelly_sys_key_t,
  shelly_sys_status_t,
  shelly_sys_type_t,
} from './components/Sys.js';
import {
  shelly_temperature_config_t,
  shelly_temperature_key_t,
  shelly_temperature_status_t,
  shelly_temperature_type_t,
} from './components/Temperature.js';
import {
  shelly_text_config_t,
  shelly_text_key_t,
  shelly_text_status_t,
  shelly_text_type_t,
} from './components/VirtualComponents/Text.js';
import {
  shelly_voltmeter_config_t,
  shelly_voltmeter_key_t,
  shelly_voltmeter_status_t,
  shelly_voltmeter_type_t,
} from './components/Voltmeter.js';
import {
  shelly_wifi_config_t,
  shelly_wifi_key_t,
  shelly_wifi_status_t,
  shelly_wifi_type_t,
} from './components/WiFi.js';
import {
  shelly_ws_config_t,
  shelly_ws_key_t,
  shelly_ws_status_t,
  shelly_ws_type_t,
} from './components/WS.js';
import {
  shelly_zigbee_config_t,
  shelly_zigbee_key_t,
  shelly_zigbee_status_t,
  shelly_zigbee_type_t,
} from './components/Zigbee.js';
import {
  shelly_bthome_component_type_t,
  shelly_bthome_config_t,
  shelly_bthome_key_t,
  shelly_bthome_status_t,
  shelly_bthome_type_t,
} from './components/BTHome.js';
import {
  shelly_em1data_config_t,
  shelly_em1data_key_t,
  shelly_em1data_status_t,
  shelly_em1data_type_t,
} from './components/EM1Data.js';
import {
  shelly_rgb_config_t,
  shelly_rgb_key_t,
  shelly_rgb_status_t,
  shelly_rgb_type_t,
} from './components/RGB.js';
import {
  shelly_rgbw_config_t,
  shelly_rgbw_key_t,
  shelly_rgbw_status_t,
  shelly_rgbw_type_t,
} from './components/RGBW.js';
import {
  shelly_button_config_t,
  shelly_button_key_t,
  shelly_button_status_t,
  shelly_button_type_t,
} from './components/VirtualComponents/Button.js';
import {
  shelly_plugs_ui_config_t,
  shelly_plugs_ui_key_t,
  shelly_plugs_ui_status_t,
  shelly_plugs_ui_type_t,
} from './components/PlugS_UI.js';
import {
  shelly_pluguk_ui_config_t,
  shelly_pluguk_ui_key_t,
  shelly_pluguk_ui_status_t,
  shelly_pluguk_ui_type_t,
} from './components/PlugUK_UI.js';
import {
  shelly_ht_ui_config_t,
  shelly_ht_ui_key_t,
  shelly_ht_ui_status_t,
  shelly_ht_ui_type_t,
} from './components/HT_UI.js';
import {
  shelly_wd_ui_config_t,
  shelly_wd_ui_key_t,
  shelly_wd_ui_status_t,
  shelly_wd_ui_type_t,
} from './components/WD_UI.js';
import {
  shelly_plusrgbw_key_t,
  shelly_plusrgbw_type_t,
  shelly_plusrgbw_status_t,
  shelly_plusrgbw_config_t,
} from './components/PlusRGBW.js';
import {
  shelly_ui_key_t,
  shelly_ui_type_t,
  shelly_ui_status_t,
  shelly_ui_config_t,
} from './components/UI.js';
import {
  shelly_blugw_key_t,
  shelly_blugw_type_t,
  shelly_blugw_status_t,
  shelly_blugw_config_t,
} from './components/BluGw.js';
import {
  shelly_blutrv_key_t,
  shelly_blutrv_type_t,
  shelly_blutrv_status_t,
  shelly_blutrv_config_t,
} from './components/BluTrv.js';
import {
  shelly_lora_config_t,
  shelly_lora_key_t,
  shelly_lora_status_t,
  shelly_lora_type_t,
} from './components/LoRa.js';
import {
  shelly_media_type_t,
  shelly_media_key_t,
  shelly_media_status_t,
  shelly_media_config_t,
} from './components/Media.js';
import {
  shelly_thermostat_config_t,
  shelly_thermostat_key_t,
  shelly_thermostat_status_t,
  shelly_thermostat_type_t,
} from './components/Thermostat.js';
import {
  shelly_cury_config_t,
  shelly_cury_key_t,
  shelly_cury_status_t,
  shelly_cury_type_t,
  shelly_cury_vial_info_t,
} from './components/Cury.js';
import { shelly_virtual_attrs_t } from './components/Virtual.js';

export type shelly_component_id_t = number;

export type shelly_component_key_t =
  | shelly_ble_key_t
  | shelly_blugw_key_t
  | shelly_blutrv_key_t
  | shelly_boolean_key_t
  | shelly_bthome_key_t
  | shelly_bthomedevice_key_t
  | shelly_bthomesensor_key_t
  | shelly_button_key_t
  | shelly_cct_key_t
  | shelly_cloud_key_t
  | shelly_cover_key_t
  | shelly_dali_key_t
  | shelly_devicepower_key_t
  | shelly_em_key_t
  | shelly_em1_key_t
  | shelly_em1data_key_t
  | shelly_emdata_key_t
  | shelly_enum_key_t
  | shelly_ethernet_key_t
  | shelly_group_key_t
  | shelly_ht_ui_key_t
  | shelly_humidity_key_t
  | shelly_input_key_t
  | shelly_knx_key_t
  | shelly_light_key_t
  | shelly_lora_key_t
  | shelly_matter_key_t
  | shelly_modbus_key_t
  | shelly_mqtt_key_t
  | shelly_number_key_t
  | shelly_object_key_t
  | shelly_plugs_ui_key_t
  | shelly_pluguk_ui_key_t
  | shelly_plusrgbw_key_t
  | shelly_pm1_key_t
  | shelly_rgb_key_t
  | shelly_rgbw_key_t
  | shelly_script_key_t
  | shelly_service_key_t
  | shelly_smoke_key_t
  | shelly_switch_key_t
  | shelly_sys_key_t
  | shelly_temperature_key_t
  | shelly_text_key_t
  | shelly_ui_key_t
  | shelly_voltmeter_key_t
  | shelly_wd_ui_key_t
  | shelly_wifi_key_t
  | shelly_ws_key_t
  | shelly_zigbee_key_t
  | shelly_media_key_t
  | shelly_thermostat_key_t
  | shelly_cury_key_t;

export type shelly_component_helper_key_to_type_t<
  T extends shelly_component_key_t,
> =
  T extends `${infer K extends shelly_component_type_t}:${shelly_component_id_t}`
    ? K
    : T extends shelly_component_type_t
      ? T
      : never;

export type shelly_component_helper_key_to_id_t<
  T extends
    | `${shelly_component_type_t}:${shelly_component_id_t}`
    | shelly_component_type_t,
> =
  T extends `${shelly_component_type_t}:${infer K extends shelly_component_id_t}`
    ? K
    : never;

type component_entry_t<
  K extends shelly_component_key_t,
  T extends shelly_component_type_t,
  C,
  S,
  A = never,
> = {
  key: K;
  type: T;
  status: S;
  config: C;
  attrs?: A;
};

export type shelly_component_status_map_t =
  | component_entry_t<
      shelly_sys_key_t,
      shelly_sys_type_t,
      shelly_sys_config_t,
      shelly_sys_status_t
    >
  | component_entry_t<
      shelly_wifi_key_t,
      shelly_wifi_type_t,
      shelly_wifi_config_t,
      shelly_wifi_status_t
    >
  | component_entry_t<
      shelly_mqtt_key_t,
      shelly_mqtt_type_t,
      shelly_mqtt_config_t,
      shelly_mqtt_status_t
    >
  | component_entry_t<
      shelly_ethernet_key_t,
      shelly_ethernet_type_t,
      shelly_ethernet_config_t,
      shelly_ethernet_status_t
    >
  | component_entry_t<
      shelly_ble_key_t,
      shelly_ble_type_t,
      shelly_ble_config_t,
      shelly_ble_status_t
    >
  | component_entry_t<
      shelly_cloud_key_t,
      shelly_cloud_type_t,
      shelly_cloud_config_t,
      shelly_cloud_status_t
    >
  | component_entry_t<
      shelly_ws_key_t,
      shelly_ws_type_t,
      shelly_ws_config_t,
      shelly_ws_status_t
    >
  | component_entry_t<
      shelly_matter_key_t,
      shelly_matter_type_t,
      shelly_matter_config_t,
      shelly_matter_status_t
    >
  | component_entry_t<
      shelly_modbus_key_t,
      shelly_modbus_type_t,
      shelly_modbus_config_t,
      shelly_modbus_status_t
    >
  | component_entry_t<
      shelly_dali_key_t,
      shelly_dali_type_t,
      shelly_dali_config_t,
      shelly_dali_status_t
    >
  | component_entry_t<
      shelly_zigbee_key_t,
      shelly_zigbee_type_t,
      shelly_zigbee_config_t,
      shelly_zigbee_status_t
    >
  | component_entry_t<
      shelly_knx_key_t,
      shelly_knx_type_t,
      shelly_knx_config_t,
      shelly_knx_status_t
    >
  | component_entry_t<
      shelly_bthome_key_t,
      shelly_bthome_type_t,
      shelly_bthome_config_t,
      shelly_bthome_status_t
    >
  | component_entry_t<
      shelly_number_key_t,
      shelly_number_type_t,
      shelly_number_config_t,
      shelly_number_status_t,
      shelly_virtual_attrs_t
    >
  | component_entry_t<
      shelly_boolean_key_t,
      shelly_boolean_type_t,
      shelly_boolean_config_t,
      shelly_boolean_status_t,
      shelly_virtual_attrs_t
    >
  | component_entry_t<
      shelly_text_key_t,
      shelly_text_type_t,
      shelly_text_config_t,
      shelly_text_status_t,
      shelly_virtual_attrs_t
    >
  | component_entry_t<
      shelly_object_key_t,
      shelly_object_type_t,
      shelly_object_config_t,
      shelly_object_status_t,
      shelly_virtual_attrs_t
    >
  | component_entry_t<
      shelly_enum_key_t,
      shelly_enum_type_t,
      shelly_enum_config_t,
      shelly_enum_status_t,
      shelly_virtual_attrs_t
    >
  | component_entry_t<
      shelly_bthomesensor_key_t,
      shelly_bthomesensor_type_t,
      shelly_bthomesensor_config_t,
      shelly_bthomesensor_status_t
    >
  | component_entry_t<
      shelly_bthomedevice_key_t,
      shelly_bthomedevice_type_t,
      shelly_bthomedevice_config_t,
      shelly_bthomedevice_status_t,
      shelly_bthomedevice_attrs_t
    >
  | component_entry_t<
      shelly_group_key_t,
      shelly_group_type_t,
      shelly_group_config_t,
      shelly_group_status_t
    >
  | component_entry_t<
      shelly_switch_key_t,
      shelly_switch_type_t,
      shelly_switch_config_t,
      shelly_switch_status_t
    >
  | component_entry_t<
      shelly_cover_key_t,
      shelly_cover_type_t,
      shelly_cover_config_t,
      shelly_cover_status_t
    >
  | component_entry_t<
      shelly_light_key_t,
      shelly_light_type_t,
      shelly_light_config_t,
      shelly_light_status_t
    >
  | component_entry_t<
      shelly_service_key_t,
      shelly_service_type_t,
      shelly_service_config_t,
      shelly_service_status_t
    >
  | component_entry_t<
      shelly_script_key_t,
      shelly_script_type_t,
      shelly_script_config_t,
      shelly_script_status_t
    >
  | component_entry_t<
      shelly_temperature_key_t,
      shelly_temperature_type_t,
      shelly_temperature_config_t,
      shelly_temperature_status_t
    >
  | component_entry_t<
      shelly_humidity_key_t,
      shelly_humidity_type_t,
      shelly_humidity_config_t,
      shelly_humidity_status_t
    >
  | component_entry_t<
      shelly_input_key_t,
      shelly_input_type_t,
      shelly_input_config_t,
      shelly_input_status_t
    >
  | component_entry_t<
      shelly_pm1_key_t,
      shelly_pm1_type_t,
      shelly_pm1_config_t,
      shelly_pm1_status_t
    >
  | component_entry_t<
      shelly_devicepower_key_t,
      shelly_devicepower_type_t,
      shelly_devicepower_config_t,
      shelly_devicepower_status_t
    >
  | component_entry_t<
      shelly_voltmeter_key_t,
      shelly_voltmeter_type_t,
      shelly_voltmeter_config_t,
      shelly_voltmeter_status_t
    >
  | component_entry_t<
      shelly_smoke_key_t,
      shelly_smoke_type_t,
      shelly_smoke_config_t,
      shelly_smoke_status_t
    >
  | component_entry_t<
      shelly_cct_key_t,
      shelly_cct_type_t,
      shelly_cct_config_t,
      shelly_cct_status_t
    >
  | component_entry_t<
      shelly_em_key_t,
      shelly_em_type_t,
      shelly_em_config_t,
      shelly_em_status_t
    >
  | component_entry_t<
      shelly_em1_key_t,
      shelly_em1_type_t,
      shelly_em1_config_t,
      shelly_em1_status_t
    >
  | component_entry_t<
      shelly_emdata_key_t,
      shelly_emdata_type_t,
      shelly_emdata_config_t,
      shelly_emdata_status_t
    >
  | component_entry_t<
      shelly_em1data_key_t,
      shelly_em1data_type_t,
      shelly_em1data_config_t,
      shelly_em1data_status_t
    >
  | component_entry_t<
      shelly_rgb_key_t,
      shelly_rgb_type_t,
      shelly_rgb_config_t,
      shelly_rgb_status_t
    >
  | component_entry_t<
      shelly_rgbw_key_t,
      shelly_rgbw_type_t,
      shelly_rgbw_config_t,
      shelly_rgbw_status_t
    >
  | component_entry_t<
      shelly_plugs_ui_key_t,
      shelly_plugs_ui_type_t,
      shelly_plugs_ui_config_t,
      shelly_plugs_ui_status_t
    >
  | component_entry_t<
      shelly_pluguk_ui_key_t,
      shelly_pluguk_ui_type_t,
      shelly_pluguk_ui_config_t,
      shelly_pluguk_ui_status_t
    >
  | component_entry_t<
      shelly_button_key_t,
      shelly_button_type_t,
      shelly_button_config_t,
      shelly_button_status_t
    >
  | component_entry_t<
      shelly_ht_ui_key_t,
      shelly_ht_ui_type_t,
      shelly_ht_ui_config_t,
      shelly_ht_ui_status_t
    >
  | component_entry_t<
      shelly_wd_ui_key_t,
      shelly_wd_ui_type_t,
      shelly_wd_ui_config_t,
      shelly_wd_ui_status_t
    >
  | component_entry_t<
      shelly_plusrgbw_key_t,
      shelly_plusrgbw_type_t,
      shelly_plusrgbw_config_t,
      shelly_plusrgbw_status_t
    >
  | component_entry_t<
      shelly_ui_key_t,
      shelly_ui_type_t,
      shelly_ui_config_t,
      shelly_ui_status_t
    >
  | component_entry_t<
      shelly_blugw_key_t,
      shelly_blugw_type_t,
      shelly_blugw_config_t,
      shelly_blugw_status_t
    >
  | component_entry_t<
      shelly_blutrv_key_t,
      shelly_blutrv_type_t,
      shelly_blutrv_config_t,
      shelly_blutrv_status_t
    >
  | component_entry_t<
      shelly_lora_key_t,
      shelly_lora_type_t,
      shelly_lora_config_t,
      shelly_lora_status_t
    >
  | component_entry_t<
      shelly_media_key_t,
      shelly_media_type_t,
      shelly_media_config_t,
      shelly_media_status_t
    >
  | component_entry_t<
      shelly_thermostat_key_t,
      shelly_thermostat_type_t,
      shelly_thermostat_config_t,
      shelly_thermostat_status_t
    >
  | component_entry_t<
      shelly_cury_key_t,
      shelly_cury_type_t,
      shelly_cury_config_t,
      shelly_cury_status_t,
      shelly_cury_vial_info_t
    >;

export type shelly_component_status_t<T extends shelly_component_type_t> =
  Extract<shelly_component_status_map_t, { type: T }>['status'];

export type shelly_component_config_t<T extends shelly_component_type_t> =
  Extract<shelly_component_status_map_t, { type: T }>['config'];

export type shelly_component_attrs_t<T extends shelly_component_type_t> =
  Extract<shelly_component_status_map_t, { type: T }>['attrs'];

export type shelly_component_type_t<
  K extends shelly_component_key_t = shelly_component_key_t,
> = Extract<shelly_component_status_map_t, { key: K }>['type'];

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
