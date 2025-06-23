export type shelly_modbus_type_t = 'modbus';
export type shelly_modbus_key_t = shelly_modbus_type_t;

export type shelly_modbus_status_t = {
  enabled: boolean;
};

export type shelly_modbus_config_t = {
  enable: boolean;
};

export type shelly_modbus_rpc_method_map_t = {
  'Modbus.GetStatus': {
    params?: {};
    result: shelly_modbus_status_t;
  };
  'Modbus.SetConfig': {
    params: {
      config: shelly_modbus_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Modbus.GetConfig': {
    params?: {};
    result: shelly_modbus_config_t;
  };
};
