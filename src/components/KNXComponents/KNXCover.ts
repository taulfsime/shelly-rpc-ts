import { shelly_knx_group_address_t } from '../KNX.js';

export type shelly_knx_cover_config_t = {
  cmd: {
    move: shelly_knx_group_address_t[];
    pause: shelly_knx_group_address_t[];
    pos: shelly_knx_group_address_t[];
    slat_pos: shelly_knx_group_address_t[];
  };
  fb: {
    dir: shelly_knx_group_address_t[];
    movement: shelly_knx_group_address_t[];
    pos_val: shelly_knx_group_address_t[];
    slat_val: shelly_knx_group_address_t[];
    obst: shelly_knx_group_address_t[];
    apower: shelly_knx_group_address_t[];
    current: shelly_knx_group_address_t[];
    voltage: shelly_knx_group_address_t[];
    aenergy: shelly_knx_group_address_t[];
  };
};
