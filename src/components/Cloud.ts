export type shelly_cloud_type_t = 'cloud';
export type shelly_cloud_key_t = shelly_cloud_type_t;

export type shelly_cloud_config_t = {
  enable: boolean;
  server: string | null;
};

export type shelly_cloud_status_t = {
  connected: boolean;
};

export type shelly_cloud_rpc_method_map_t = {
  'Cloud.GetStatus': {
    params: never;
    result: shelly_cloud_status_t;
  };
  'Cloud.SetConfig': {
    params: {
      config: shelly_cloud_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Cloud.GetConfig': {
    params: never;
    result: shelly_cloud_config_t;
  };
};
