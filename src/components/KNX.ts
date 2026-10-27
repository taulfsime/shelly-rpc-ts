import { shelly_cover_key_t } from './Cover.js';
import { shelly_input_key_t } from './Input.js';
import { shelly_knx_cover_config_t } from './KNXComponents/KNXCover.js';
import { shelly_knx_input_config_t } from './KNXComponents/KNXInput.js';
import { shelly_knx_light_config_t } from './KNXComponents/KNXLight.js';
import { shelly_knx_switch_config_t } from './KNXComponents/KNXSwitch.js';
import { shelly_light_key_t } from './Light.js';
import { shelly_switch_key_t } from './Switch.js';

type shelly_knx_individual_address_t = `${number}.${number}.${number}`;

type shelly_knx_component_key_t =
  | shelly_light_key_t
  | shelly_switch_key_t
  | shelly_cover_key_t
  | shelly_input_key_t;

type shelly_knx_component_config_helper_t<
  K extends shelly_knx_component_key_t,
> = K extends shelly_switch_key_t
  ? shelly_knx_switch_config_t
  : K extends shelly_light_key_t
    ? shelly_knx_light_config_t
    : K extends shelly_input_key_t
      ? shelly_knx_input_config_t
      : K extends shelly_cover_key_t
        ? shelly_knx_cover_config_t
        : never;

// the firmware sends an empty group address list as null
type shelly_knx_nullable_lists_t<T> = {
  [P in keyof T]: T[P] extends unknown[]
    ? T[P] | null
    : T[P] extends object
      ? shelly_knx_nullable_lists_t<T[P]>
      : T[P];
};

type shelly_knx_partial_t<T> = {
  [P in keyof T]?: T[P] extends unknown[]
    ? T[P] | null
    : T[P] extends object
      ? shelly_knx_partial_t<T[P]>
      : T[P];
};

// one KNX component's config, as KNX.ListComponents and
// KNX.GetComponentConfig send it
export type shelly_knx_component_config_t = shelly_knx_nullable_lists_t<
  shelly_knx_component_config_helper_t<shelly_knx_component_key_t>
> & {
  key: shelly_knx_component_key_t;
};

export type shelly_knx_type_t = 'knx';
export type shelly_knx_key_t = shelly_knx_type_t;
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
    params?: {};
    result: shelly_knx_status_t;
  };
  'KNX.SetConfig': {
    params: {
      // null restores the default
      config: {
        enable?: boolean;
        ia?: shelly_knx_individual_address_t | null;
        routing?: {
          addr?: shelly_knx_config_t['routing']['addr'] | null;
        };
      };
      reboot?: boolean; // restarts right after saving
    };
    result: {
      restart_required: boolean;
    };
  };
  'KNX.GetConfig': {
    params?: {};
    result: shelly_knx_config_t;
  };

  //XXX: Fix the return type must be based on the provided key
  'KNX.GetComponentConfig': {
    params: {
      key: shelly_knx_component_key_t;
    };
    result: {
      rev: shelly_knx_rev_t;
      config: shelly_knx_component_config_t;
    };
  };
  'KNX.SetComponentConfig': {
    params: {
      key: shelly_knx_component_key_t;
      config: shelly_knx_partial_t<
        shelly_knx_component_config_helper_t<shelly_knx_component_key_t>
      >;
      reboot?: boolean; // restarts right after saving
    };
    result: {
      rev: shelly_knx_rev_t;
      restart_required: boolean;
    };
  };
  'KNX.ListComponents': {
    params?: {
      offset?: number;
    };
    result: {
      rev: shelly_knx_rev_t;
      offset: number;
      total: number;
      components: shelly_knx_component_config_t[]; // a page of them
    };
  };
};
