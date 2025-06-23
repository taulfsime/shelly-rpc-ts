export type shelly_zigbee_type_t = 'zigbee';
export type shelly_zigbee_key_t = shelly_zigbee_type_t;

export type shelly_zigbee_status_t = {
  network_state: 'disabled' | 'initializing' | 'steering' | 'joined' | 'failed';
};

export type shelly_zigbee_config_t = {
  enable: boolean;
};

export type shelly_zigbee_rpc_method_map_t = {
  'Zigbee.GetStatus': {
    params?: {};
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
    params?: {};
    result: shelly_zigbee_config_t;
  };
  'Zigbee.StartNetworkSteering': {
    params?: {};
    result: null;
  };
};
