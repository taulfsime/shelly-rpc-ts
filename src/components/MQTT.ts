export type shelly_mqtt_type_t = 'mqtt';
export type shelly_mqtt_key_t = shelly_mqtt_type_t;

export type shelly_mqtt_status_t = {
  connected: boolean;
};

export type shelly_mqtt_config_t = {
  enable: boolean;
  server: string | null;
  client_id: string | null;
  username: string | null;
  ssl_ca: null | '*' | 'user_ca.pem' | 'ca.pem';
  topic_prefix: string | null;
  rpc_ntf: boolean;
  status_ntf: boolean;
  use_client_cert: boolean;
  enable_control: boolean;
};

export type shelly_mqtt_rpc_method_map_t = {
  'MQTT.GetStatus': {
    params?: {};
    result: shelly_mqtt_status_t;
  };
  'MQTT.GetConfig': {
    params?: {};
    result: shelly_mqtt_config_t;
  };
  'MQTT.SetConfig': {
    params: {
      config: shelly_mqtt_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
};
