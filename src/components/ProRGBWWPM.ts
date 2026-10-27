import { optional_recursive_t } from './helpers.js';

export type shelly_prorgbwwpm_type_t = 'prorgbwwpm';
export type shelly_prorgbwwpm_key_t = shelly_prorgbwwpm_type_t;

export type shelly_prorgbwwpm_status_t = {};

export type shelly_prorgbwwpm_config_t = {
  hf_mode: boolean; // PWM at 22 kHz instead of 833 Hz
};

export type shelly_prorgbwwpm_rpc_method_map_t = {
  'ProRGBWWPM.GetStatus': {
    params?: {};
    result: shelly_prorgbwwpm_status_t;
  };
  'ProRGBWWPM.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_prorgbwwpm_config_t>;
      reboot?: boolean;
    };
    result: {
      restart_required: boolean;
    };
  };
  'ProRGBWWPM.GetConfig': {
    params?: {};
    result: shelly_prorgbwwpm_config_t;
  };
};
