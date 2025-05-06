import { shelly_component_key_t } from '../ShellyComponents.js';
import { shelly_knx_cover_config_t } from './KNXComponents/KNXCover.js';
import { shelly_knx_input_config_t } from './KNXComponents/KNXInput.js';
import { shelly_knx_light_config_t } from './KNXComponents/KNXLight.js';
import { shelly_knx_switch_config_t } from './KNXComponents/KNXSwitch.js';

type shelly_knx_individual_address_t = `${number}.${number}.${number}`;

type shelly_knx_component_key_t = Extract<
  shelly_component_key_t,
  `${'light' | 'switch' | 'cover' | 'input'}:${number}`
>;

type shelly_knx_component_config_helper_t<
  K extends shelly_knx_component_key_t,
> = K extends `switch:${number}`
  ? shelly_knx_switch_config_t
  : K extends `light:${number}`
    ? shelly_knx_light_config_t
    : K extends `input:${number}`
      ? shelly_knx_input_config_t
      : K extends `cover:${number}`
        ? shelly_knx_cover_config_t
        : never;

export type shelly_knx_group_address_t = `${number}/${number}/${number}`;

export type shelly_knx_rev_t = number;

export type shelly_knx_config_t = {
  enable: boolean;
  ia: shelly_knx_individual_address_t;
  routing: {
    addr: `${string}:${number}`; //XXX: type
  };
};

export type shelly_knx_status_t = {};

export type shelly_knx_rpc_method_map_t = {
  'KNX.GetStatus': {
    params: never;
    result: shelly_knx_status_t;
  };
  'KNX.SetConfig': {
    params: {
      config: shelly_knx_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'KNX.GetConfig': {
    params: never;
    result: shelly_knx_config_t;
  };

  //XXX: Fix the return type must be based on the provided key
  'KNX.GetComponentConfig': {
    params: {
      key: shelly_knx_component_key_t;
    };
    result: {
      rev: shelly_knx_rev_t;
      config: shelly_knx_component_config_helper_t<shelly_knx_component_key_t>;
    };
  };
  'KNX.SetComponentConfig': {
    params: {
      key: shelly_knx_component_key_t;
      config: shelly_knx_component_config_helper_t<shelly_knx_component_key_t>;
    };
    result: {
      rev: shelly_knx_rev_t;
      restart_required: boolean;
    };
  };
  'KNX.ListComponents': {
    params: {
      offset?: number;
    };
    result: {
      rev: shelly_knx_rev_t;
      offset: number;
      total: number;
      key: shelly_knx_component_key_t;
    } & shelly_knx_component_config_helper_t<shelly_knx_component_key_t>;
  };
};
