import { optional_recursive_t } from './helpers.js';

export type shelly_ble_type_t = 'ble';
export type shelly_ble_key_t = shelly_ble_type_t;

export type shelly_ble_config_t = {
  enable: boolean;
  rpc: {
    enable: boolean;
  };
};

export type shelly_ble_status_t = {
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
  'BLE.StartBluTrvAssociations': {
    params: {
      blutrv_id: number;
      duration: number;
      rssi_thr: number;
    };
    result: null;
  };
};
