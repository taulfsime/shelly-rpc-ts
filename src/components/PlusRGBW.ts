export type shelly_plusrgbw_type_t = 'plusrgbw';
export type shelly_plusrgbw_key_t = shelly_plusrgbw_type_t;

export type shelly_plusrgbw_status_t = {};

export type shelly_plusrgbw_config_t = {
  hf_mode: boolean;
};

export type shelly_plusrgbw_rpc_method_map_t = {
  'PlusRGBW.GetStatus': {
    params: never;
    result: shelly_plusrgbw_status_t;
  };
  'PlusRGBW.SetConfig': {
    params: {
      config: shelly_plusrgbw_config_t;
    };
  };
  'PlusRGBW.GetConfig': {
    params: never;
    result: shelly_plusrgbw_config_t;
  };
};
