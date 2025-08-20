import { shelly_boolean_rpc_method_map_t } from './components/VirtualComponents/Boolean.js';
import { shelly_bthomedevice_rpc_method_map_t } from './components/BTHomeComponents/BTHomeDevice.js';
import { shelly_bthomesensor_rpc_method_map_t } from './components/BTHomeComponents/BTHomeSensor.js';
import { shelly_button_rpc_method_map_t } from './components/VirtualComponents/Button.js';
import { shelly_cover_rpc_method_map_t } from './components/Cover.js';
import { shelly_enum_rpc_method_map_t } from './components/VirtualComponents/Enum.js';
import { shelly_group_rpc_method_map_t } from './components/VirtualComponents/Group.js';
import { shelly_humidity_rpc_method_map_t } from './components/Humidity.js';
import { shelly_input_rpc_method_map_t } from './components/Input.js';
import { shelly_light_rpc_method_map_t } from './components/Light.js';
import { shelly_mqtt_rpc_method_map_t } from './components/MQTT.js';
import { shelly_number_rpc_method_map_t } from './components/VirtualComponents/Number.js';
import { shelly_script_rpc_method_map_t } from './components/Script.js';
import { shelly_service_rpc_method_map_t } from './components/Service.js';
import { shelly_switch_rpc_method_map_t } from './components/Switch.js';
import { shelly_sys_rpc_method_map_t } from './components/Sys.js';
import { shelly_temperature_rpc_method_map_t } from './components/Temperature.js';
import { shelly_text_rpc_method_map_t } from './components/VirtualComponents/Text.js';
import { shelly_wifi_rpc_method_map_t } from './components/WiFi.js';
import {
  shelly_device_info_data_t,
  shelly_device_rpc_method_map_t,
} from './components/Shelly.js';
import { shelly_object_rpc_method_map_t } from './components/VirtualComponents/Object.js';
import {
  shelly_component_helper_key_to_type_t,
  shelly_component_id_t,
  shelly_component_key_t,
  shelly_component_status_t,
} from './ShellyComponents.js';
import { shelly_pm1_rpc_method_map_t } from './components/PM1.js';
import { shelly_devicepower_rpc_method_map_t } from './components/DevicePower.js';
import { shelly_ethernet_rpc_method_map_t } from './components/Ethernet.js';
import { shelly_ble_rpc_method_map_t } from './components/BLE.js';
import { shelly_cloud_rpc_method_map_t } from './components/Cloud.js';
import { shelly_ws_rpc_method_map_t } from './components/WS.js';
import { shelly_matter_rpc_method_map_t } from './components/Matter.js';
import { shelly_modbus_rpc_method_map_t } from './components/Modbus.js';
import { shelly_voltmeter_rpc_method_map_t } from './components/Voltmeter.js';
import { shelly_smoke_rpc_method_map_t } from './components/Smoke.js';
import { shelly_dali_rpc_method_map_t } from './components/DALI.js';
import { shelly_cct_rpc_method_map_t } from './components/CCT.js';
import { shelly_zigbee_rpc_method_map_t } from './components/Zigbee.js';
import { shelly_em_rpc_method_map_t } from './components/EM.js';
import { shelly_em1_rpc_method_map_t } from './components/EM1.js';
import { shelly_emdata_rpc_method_map_t } from './components/EMData.js';
import { shelly_schedule_rpc_method_map_t } from './components/Schedule.js';
import { shelly_webhook_rpc_method_map_t } from './components/Webhook.js';
import { shelly_kvs_rpc_method_map_t } from './components/KVS.js';
import { shelly_knx_rpc_method_map_t } from './components/KNX.js';
import { shelly_virtual_rpc_method_map_t } from './components/Virtual.js';
import { shelly_bthome_rpc_method_map_t } from './components/BTHome.js';
import { shelly_em1data_rpc_method_map_t } from './components/EM1Data.js';
import { shelly_http_rpc_method_map_t } from './components/HTTP.js';
import { shelly_rgb_rpc_method_map_t } from './components/RGB.js';
import { shelly_rgbw_rpc_method_map_t } from './components/RGBW.js';
import { shelly_plugs_ui_rpc_method_map_t } from './components/PlugS_UI.js';
import { shelly_pluguk_ui_rpc_method_map_t } from './components/PlugUK_UI.js';
import { shelly_ht_ui_rpc_method_map_t } from './components/HT_UI.js';
import { shelly_wd_ui_rpc_method_map_t } from './components/WD_UI.js';
import { shelly_plusrgbw_rpc_method_map_t } from './components/PlusRGBW.js';
import { shelly_ui_rpc_method_map_t } from './components/UI.js';
import { shelly_blugw_rpc_method_map_t } from './components/BluGw.js';
import { shelly_blutrv_rpc_method_map_t } from './components/BluTrv.js';
import { shelly_xmod_rpc_method_map_t } from './components/XMOD.js';
import { shelly_lora_rpc_method_map_t } from './components/LoRa.js';
import { shelly_sensor_addon_rpc_method_map_t } from './components/SensorAddon.js';
import { shelly_pro_output_addon_rpc_method_map_t } from './components/ProOutputAddon.js';
import { shelly_uart_addon_rpc_method_map_t } from './components/UartAddon.js';
import { shelly_bthomecontrol_rpc_method_map_t } from './components/BTHomeComponents/BTHomeControl.js';

type shelly_rpc_method_map_t = shelly_device_rpc_method_map_t &
  shelly_ble_rpc_method_map_t &
  shelly_blugw_rpc_method_map_t &
  shelly_blutrv_rpc_method_map_t &
  shelly_boolean_rpc_method_map_t &
  shelly_bthome_rpc_method_map_t &
  shelly_bthomecontrol_rpc_method_map_t &
  shelly_bthomedevice_rpc_method_map_t &
  shelly_bthomesensor_rpc_method_map_t &
  shelly_button_rpc_method_map_t &
  shelly_cct_rpc_method_map_t &
  shelly_cloud_rpc_method_map_t &
  shelly_cover_rpc_method_map_t &
  shelly_dali_rpc_method_map_t &
  shelly_devicepower_rpc_method_map_t &
  shelly_em_rpc_method_map_t &
  shelly_em1_rpc_method_map_t &
  shelly_em1data_rpc_method_map_t &
  shelly_emdata_rpc_method_map_t &
  shelly_enum_rpc_method_map_t &
  shelly_ethernet_rpc_method_map_t &
  shelly_group_rpc_method_map_t &
  shelly_ht_ui_rpc_method_map_t &
  shelly_http_rpc_method_map_t &
  shelly_humidity_rpc_method_map_t &
  shelly_input_rpc_method_map_t &
  shelly_knx_rpc_method_map_t &
  shelly_kvs_rpc_method_map_t &
  shelly_light_rpc_method_map_t &
  shelly_lora_rpc_method_map_t &
  shelly_matter_rpc_method_map_t &
  shelly_modbus_rpc_method_map_t &
  shelly_mqtt_rpc_method_map_t &
  shelly_number_rpc_method_map_t &
  shelly_object_rpc_method_map_t &
  shelly_plugs_ui_rpc_method_map_t &
  shelly_pluguk_ui_rpc_method_map_t &
  shelly_plusrgbw_rpc_method_map_t &
  shelly_pm1_rpc_method_map_t &
  shelly_pro_output_addon_rpc_method_map_t &
  shelly_rgb_rpc_method_map_t &
  shelly_rgbw_rpc_method_map_t &
  shelly_schedule_rpc_method_map_t &
  shelly_script_rpc_method_map_t &
  shelly_sensor_addon_rpc_method_map_t &
  shelly_service_rpc_method_map_t &
  shelly_smoke_rpc_method_map_t &
  shelly_switch_rpc_method_map_t &
  shelly_sys_rpc_method_map_t &
  shelly_temperature_rpc_method_map_t &
  shelly_text_rpc_method_map_t &
  shelly_uart_addon_rpc_method_map_t &
  shelly_ui_rpc_method_map_t &
  shelly_virtual_rpc_method_map_t &
  shelly_voltmeter_rpc_method_map_t &
  shelly_wd_ui_rpc_method_map_t &
  shelly_webhook_rpc_method_map_t &
  shelly_wifi_rpc_method_map_t &
  shelly_ws_rpc_method_map_t &
  shelly_xmod_rpc_method_map_t &
  shelly_zigbee_rpc_method_map_t;

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

export type shelly_rpc_method_error_t = {
  code: number;
  message: string;
};

export type shelly_rpc_auth_response_t = {
  auth_type: 'digest';
  realm: NonNullable<shelly_device_info_data_t['auth_domain']>;
  nonce: number;
  algorithm: 'SHA-256';
  nc: number;
};

export type shelly_rpc_auth_request_t = {
  realm: shelly_rpc_auth_response_t['realm'];
  username: string;
  nonce: shelly_rpc_auth_response_t['nonce'];
  cnonce: shelly_rpc_auth_response_t['nonce'];
  response: string;
  algorithm: shelly_rpc_auth_response_t['algorithm'];
};

export type shelly_rpc_msg_request_id_t = string | number;

export type shelly_rpc_msg_request_t<
  K extends shelly_rpc_method_t = shelly_rpc_method_t,
> = {
  jsonrpc: '2.0';
  id: shelly_rpc_msg_request_id_t;
  src: string;
  method: K;
  params: shelly_rpc_method_params_t<K>;
  auth?: shelly_rpc_auth_request_t;
};

type shelly_rpc_msg_response_base_t = {
  id: shelly_rpc_msg_request_id_t;
  src: string;
  dst: string;
  result: never;
  error: never;
};

export type shelly_rpc_msg_response_result_t<K extends shelly_rpc_method_t> =
  shelly_rpc_msg_response_base_t & {
    result: shelly_rpc_method_result_t<K>;
  };

export type shelly_rpc_msg_response_error_t = shelly_rpc_msg_response_base_t & {
  error: shelly_rpc_method_error_t;
};

export type shelly_rpc_msg_response_t<K extends shelly_rpc_method_t> =
  | shelly_rpc_msg_response_result_t<K>
  | shelly_rpc_msg_response_error_t;

export type shelly_rpc_notification_method_t =
  | 'NotifyStatus'
  | 'NotifyFullStatus'
  | 'NotifyEvent';

type shelly_rpc_notification_base_t = {
  src: string;
  dist: string;
  method: shelly_rpc_notification_method_t;
  params: unknown;
};

export type shelly_rpc_notification_notify_status_t =
  shelly_rpc_notification_base_t & {
    method: 'NotifyStatus' | 'NotifyFullStatus';
    params: {
      ts: number;
    } & {
      [K in shelly_component_key_t]?: Partial<
        shelly_component_status_t<shelly_component_helper_key_to_type_t<K>>
      >;
    };
  };

export type shelly_rpc_notification_notify_event_t =
  shelly_rpc_notification_base_t & {
    method: 'NotifyEvent';
    params: {
      ts: number;
      events: {
        ts: number;
        component: shelly_component_key_t;
        id: shelly_component_id_t;
        event: string; // XXX:
      }[];
    };
  };

export type shelly_rpc_notification_t =
  | shelly_rpc_notification_notify_status_t
  | shelly_rpc_notification_notify_event_t;

export function isRpcResponse(
  data: unknown
): data is shelly_rpc_msg_response_t<shelly_rpc_method_t> {
  if (typeof data !== 'object' || Array.isArray(data) || data == null) {
    // console.log('isRpcResponse: data is not an object or is null/array');
    return false;
  }

  if (
    !('id' in data) ||
    (typeof data.id !== 'string' && typeof data.id !== 'number')
  ) {
    // console.log('isRpcResponse: id is missing or not a string/number');
    return false;
  }

  if (!('src' in data) || typeof data.src !== 'string') {
    // console.log('isRpcResponse: src is missing or not a string');
    return false;
  }

  if (!('dst' in data) || typeof data.dst !== 'string') {
    // console.log('isRpcResponse: dst is missing or not a string');
    return false;
  }

  return 'result' in data || 'error' in data;
}

export function isRpcNotification(
  data: unknown
): data is shelly_rpc_notification_t {
  if (typeof data !== 'object' || Array.isArray(data) || data == null) {
    // console.log('isRpcNotification: data is not an object or is null/array');
    return false;
  }

  if (!('src' in data) || typeof data.src !== 'string') {
    // console.log('isRpcNotification: src is missing or not a string');
    return false;
  }

  if (!('dst' in data) || typeof data.dst !== 'string') {
    // console.log('isRpcNotification: dst is missing or not a string');
    return false;
  }

  if (!('method' in data) || typeof data.method !== 'string') {
    // console.log('isRpcNotification: method is missing or not a string');
    return false;
  }

  if (!('params' in data)) {
    // console.log('isRpcNotification: params are missing');
    return false;
  }

  return (
    data.method === 'NotifyStatus' ||
    data.method === 'NotifyFullStatus' ||
    data.method === 'NotifyEvent'
  );
}

export function isRpcError(error: unknown): error is shelly_rpc_method_error_t {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'number' &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

export function isRpcAuthResponse(
  response: unknown
): response is shelly_rpc_auth_response_t {
  return (
    typeof response === 'object' &&
    response !== null &&
    'auth_type' in response &&
    response.auth_type === 'digest' &&
    'realm' in response &&
    typeof response.realm === 'string' &&
    'nonce' in response &&
    'algorithm' in response &&
    response.algorithm === 'SHA-256' &&
    'nc' in response &&
    typeof response.nc === 'number'
  );
}
