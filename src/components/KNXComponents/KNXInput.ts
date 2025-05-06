import { shelly_knx_group_address_t } from '../KNX.js';

type shelly_knx_inout_config_btn_extended_fb_t = {
  fb: shelly_knx_group_address_t[];
  type: 'none' | 'command' | 'percent' | 'ratio' | 'scene_set' | 'scene_recall';
  command: 'on' | 'off' | 'toggle';
  percent: number;
  ratio: number;
  scene: number;
};

export type shelly_knx_input_config_t = {
  mode:
    | 'sw_toggle'
    | 'btn_dual_dim'
    | 'btn_single_dim'
    | 'btn_normal'
    | 'btn_extended';
  sw_toggle: {
    fb_status: shelly_knx_group_address_t[];
  };
  btn_dual_dim: {
    fb_state: shelly_knx_group_address_t[];
    fb_dim: shelly_knx_group_address_t[];
    dir: 'up' | 'down';
    step: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
  btn_single_dim: {
    fb_state: shelly_knx_group_address_t[];
    fb_dim: shelly_knx_group_address_t[];
    cmd_state: shelly_knx_group_address_t | null;
    step: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
  btn_normal: {
    command: 'on' | 'off' | 'toggle';
    fb_state: shelly_knx_group_address_t[];
    cmd_state: shelly_knx_group_address_t | null;
  };
  btn_extended: {
    cmd_state: shelly_knx_group_address_t | null;
    single_push: shelly_knx_inout_config_btn_extended_fb_t;
    double_push: shelly_knx_inout_config_btn_extended_fb_t;
    triple_push: shelly_knx_inout_config_btn_extended_fb_t;
    long_push: shelly_knx_inout_config_btn_extended_fb_t;
  };
};
