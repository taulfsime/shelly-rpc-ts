export type shelly_ws_config_t = {
  enable: boolean;
  server: `ws://${string}` | `wss://${string}`;
  ssl_ca: '*' | 'user_ca.pem' | 'ca.pem';
};

export type shelly_ws_status_t = {
  connected: boolean;
};

export type shelly_ws_rpc_method_map_t = {
  'WS.GetStatus': {
    params: never;
    result: shelly_ws_status_t;
  };
  'WS.SetConfig': {
    params: {
      config: shelly_ws_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'WS.GetConfig': {
    params: never;
    result: shelly_ws_config_t;
  };
};
