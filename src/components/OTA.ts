export type shelly_ota_rpc_method_map_t = {
  'OTA.Start': {
    params: {
      size: number;
      commit_timeout?: number;
    };
    result: null;
  };
  'OTA.Write': {
    params: {
      offset: number;
      data: string; // base64 encoded chunk
    };
    result: {
      offset: number;
    };
  };
  'OTA.Abort': {
    params?: {};
    result: null;
  };
};
