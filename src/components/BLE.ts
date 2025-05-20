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

export type shelly_ble_rpc_method_map_t = {
  'BLE.GetConfig': {
    params: never;
    result: shelly_ble_config_t;
  };
  'BLE.SetConfig': {
    params: {
      config: shelly_ble_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BLE.GetStatus': {
    params: never;
    result: shelly_ble_status_t;
  };
  'BLE.CloudRelay.List': {
    params: never;
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
      devices: {
        name: string | null;
        model: 0 | number;
        sdata: Record<string, string>;
        mdata: Record<string, string>;
        last_seen: number;
      }[];
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
