import { shelly_component_key_t } from '../ShellyComponents.js';
import { shelly_knx_rev_t } from './KNX.js';
import { shelly_kvs_rev_t } from './KVS.js';
import { shelly_lora_addon_config_type_t } from './LoRa.js';
import { shelly_pro_output_addon_config_type_t } from './ProOutputAddon.js';
import { shelly_schedule_rev_t } from './Schedule.js';
import { shelly_sensor_addon_config_type_t } from './SensorAddon.js';
import {
  shelly_device_location_t,
  shelly_device_mac_t,
  shelly_device_profile_t,
  shelly_device_update_info_t,
  shelly_device_update_stage_t,
} from './Shelly.js';
import { shelly_webhook_rev_t } from './Webhook.js';

type shelly_addon_type_t =
  | shelly_sensor_addon_config_type_t
  | shelly_pro_output_addon_config_type_t
  | shelly_lora_addon_config_type_t
  | null;
type shelly_sys_wakeup_reason_boot_t =
  | 'poweron'
  | 'software_restart'
  | 'deepsleep_wake'
  | 'internal'
  | 'unknown';
type shelly_sys_wakeup_reason_cause_t =
  | 'button'
  | 'usb'
  | 'periodic'
  | 'status_update'
  | 'alarm'
  | 'alarm_test'
  | 'undefined';

export type shelly_sys_type_t = 'sys';
export type shelly_sys_key_t = shelly_sys_type_t;

export type shelly_sys_config_t = {
  device: {
    name: string;
    eco_mode: boolean;
    mac: shelly_device_mac_t;
    fw_id: string; //XXX: Make specific type
    profile?: shelly_device_profile_t;
    discoverable: boolean;
    addon_type?: shelly_addon_type_t;
    sys_btn_toggle?: boolean;
  };
  location: shelly_device_location_t;
  debug: {
    mqtt: {
      enable: boolean;
    };
    websocket: {
      enable: boolean;
    };
    udp: {
      enable: boolean;
    };
    file_log: {
      enable: boolean;
    };
  };
  ui_data: Record<string, unknown>;
  rpc_udp: {
    dst_addr: string;
    listen_port: number | null;
  };
  sntp: {
    server: string;
  };
  cfg_rev: number;
};

export type shelly_sys_status_t = {
  mac: shelly_device_mac_t;
  restart_required: boolean;
  time: `${string}:${string}` | null;
  unixtime: number | null;
  last_sync_ts: number | null;
  uptime: number;
  ram_size: number;
  ram_free: number;
  ram_min_free: number;
  fs_size: number;
  fs_free: number;
  cfg_rev: number;
  kvs_rev?: shelly_kvs_rev_t;
  schedule_rev?: shelly_schedule_rev_t;
  webhook_rev: shelly_webhook_rev_t;
  knx_rev?: shelly_knx_rev_t;
  btrelay_rev?: number;
  available_updates: Partial<
    Record<
      shelly_device_update_stage_t,
      Pick<shelly_device_update_info_t, 'version'>
    >
  >;
  alt?: {
    [key: string]: {
      name: string;
      desc: string;
    } & Partial<
      Record<shelly_device_update_stage_t, shelly_device_update_info_t>
    >;
  };
  wakeup_reason?: {
    boot: shelly_sys_wakeup_reason_boot_t;
    cause: shelly_sys_wakeup_reason_cause_t;
  };
  wakeup_period?: number;
  reset_reason?: number;
  utc_offset: number;
  ch?: shelly_component_key_t[];
};

export type shelly_sys_rpc_method_map_t = {
  'Sys.GetStatus': {
    params: never;
    result: shelly_sys_status_t;
  };
  'Sys.SetConfig': {
    params: {
      config: shelly_sys_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Sys.GetConfig': {
    params: never;
    result: shelly_sys_config_t;
  };
  'Sys.SetTime': {
    params: {
      unixtime: number;
    };
    result: null;
  };
};
