import { optional_recursive_t } from './helpers.js';

export type shelly_ble_type_t = 'ble';
export type shelly_ble_key_t = shelly_ble_type_t;

export type shelly_ble_config_t = {
  rpc: {
    enable: boolean;
  };
  keep_running?: boolean;
};

type shelly_ble_status_flag_t = 'scanning' | 'advertising' | 'connected';

export type shelly_ble_status_t = {
  addr: string;
  flags?: shelly_ble_status_flag_t[];
  pairing?: {
    started_at: number;
    duration: number;
  };
  blutrv_assoc?: {
    duration: number;
    started_at: number;
  };
};

export type shelly_ble_client_single_result_t = {
  name: string | null;
  model: 0 | number;
  sdata: Record<string, string>;
  mdata: Record<string, string>;
  last_seen: number;
};

export type shelly_ble_paired_device_t = {
  addr: string;
  ctime: number;
  atime: number;
};

export type shelly_ble_bthome_command_opcode_t = 0 | 1 | 2 | 3 | 4;

export type shelly_ble_rpc_method_map_t = {
  'BLE.GetConfig': {
    params?: {};
    result: shelly_ble_config_t;
  };
  'BLE.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_ble_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BLE.GetStatus': {
    params?: {};
    result: shelly_ble_status_t;
  };
  'BLE.CloudRelay.List': {
    params?: {};
    result: {
      rev: number;
      addrs: string[];
    };
  };
  'BLE.CloudRelay.ListInfos': {
    params: {
      offset: number;
    };
    result: {
      ts: number;
      offset: number;
      count: number;
      total: number;
      devices: shelly_ble_client_single_result_t[];
    };
  };
  'BLE.StartAssociations': {
    params: {
      target: number;
      param?: unknown;
      duration?: number;
      rssi_thr?: number;
    };
    result: null;
  };
  'BLE.StartBluTrvAssociations': {
    params: {
      blutrv_id?: number;
      duration?: number;
      rssi_thr?: number;
    };
    result: null;
  };
  'BLE.StartPairing': {
    params?: {
      timeout?: number;
    };
    result: {
      timeout: number;
    };
  };
  'BLE.StopPairing': {
    params?: {};
    result: null;
  };
  'BLE.ListPairedDevices': {
    params?: {};
    result: shelly_ble_paired_device_t[];
  };
  'BLE.DeletePairedDevice': {
    params: {
      addr: string;
    };
    result: null;
  };
  'BLE.AdvertiseOnce': {
    params: {
      adv_data: string;
      scan_rsp?: string;
    };
    result: null;
  };
  'BLE.SendBTHomeCommand': {
    params: {
      opcode: shelly_ble_bthome_command_opcode_t;
      args?: string;
      key: string;
    };
    result: null;
  };
};
