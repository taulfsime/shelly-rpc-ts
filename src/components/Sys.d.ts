import {
  shelly_device_location_t,
  shelly_device_mac_t,
  shelly_device_profile_t,
  shelly_device_update_info_t,
  shelly_device_update_stage_t,
} from '../Shelly';

type shelly_addon_type_t = 'sensor' | 'prooutput' | 'LoRa' | null; //XXX: move to addon types
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
  fs_size: number;
  fs_free: number;
  cfg_rev: number;
  kvs_rev?: number;
  schedule_rev?: number;
  webhook_rev: number; //XXX: all devices have webhooks?
  knx_rev?: number;
  btrelay_rev?: number;
  available_updates: Partial<
    Record<
      shelly_device_update_stage_t,
      Pick<shelly_device_update_info_t, 'version'>
    >
  >;
  wakeup_reason?: {
    boot: shelly_sys_wakeup_reason_boot_t;
    cause: shelly_sys_wakeup_reason_cause_t;
  };
  wakeup_period?: number;
  utc_offset: number;
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
