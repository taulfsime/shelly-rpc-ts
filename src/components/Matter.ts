import { optional_recursive_t } from './helpers.js';

export type shelly_matter_type_t = 'matter';
export type shelly_matter_key_t = shelly_matter_type_t;

export type shelly_matter_config_t = {
  enable: boolean;
};

export type shelly_matter_status_t = {
  num_fabrics: number;
  commissionable: boolean;
};

export type shelly_matter_rpc_method_map_t = {
  'Matter.GetConfig': {
    params?: {};
    result: shelly_matter_config_t;
  };
  'Matter.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_matter_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Matter.GetStatus': {
    params?: {};
    result: shelly_matter_status_t;
  };
  'Matter.GetSetupCode': {
    params?: {};
    result: {
      qr_code: string;
      manual_code: string;
    };
  };
  'Matter.FactoryReset': {
    params?: {};
    result: null;
  };
};
