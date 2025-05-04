export type shelly_zigbee_status_t = {
  network_state: 'disabled' | 'initializing' | 'steering' | 'joined' | 'failed';
};

export type shelly_zigbee_config_t = {
  enable: boolean;
};

export type shelly_zigbee_rpc_method_map_t = {
  'Zigbee.GetStatus': {
    params: never;
    result: shelly_zigbee_status_t;
  };
  'Zigbee.SetConfig': {
    params: {
      config: shelly_zigbee_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Zigbee.GetConfig': {
    params: never;
    result: shelly_zigbee_config_t;
  };
  'Zigbee.StartNetworkSteering': {
    params: never;
    result: null;
  };
};
