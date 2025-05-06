import { shelly_knx_group_address_t } from '../KNX.js';

export type shelly_knx_light_config_t = {
  cmd: {
    control: shelly_knx_group_address_t[];
    value: shelly_knx_group_address_t[];
    dimming: shelly_knx_group_address_t[];
  };
  fb: {
    status: shelly_knx_group_address_t[];
    brightness: shelly_knx_group_address_t[];
    apower?: shelly_knx_group_address_t[];
    current?: shelly_knx_group_address_t[];
    voltage?: shelly_knx_group_address_t[];
    aenergy?: shelly_knx_group_address_t[];
  };
};
