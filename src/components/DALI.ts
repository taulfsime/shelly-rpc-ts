type shelly_dali_status_errors_t = 'control_gear_missing' | 'driver';

export type shelly_dali_type_t = 'dali';
export type shelly_dali_key_t = shelly_dali_type_t;

export type shelly_dali_config_t = {};

export type shelly_dali_status_t = {
  cg_count: number | null;
  scan?: {
    cg_count: number;
    started_at: number;
  };
  errors?: shelly_dali_status_errors_t[];
};

export type shelly_dali_rpc_method_map_t = {
  'DALI.GetStatus': {
    params?: {};
    result: shelly_dali_status_t;
  };
  'DALI.SetConfig': {
    params: {
      config: shelly_dali_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'DALI.GetConfig': {
    params?: {};
    result: shelly_dali_config_t;
  };
  'DALI.StartScan': {
    params?: {};
    result: null;
  };
  'DALI.PingKnownDevices': {
    params?: {};
    result: null;
  };
};
