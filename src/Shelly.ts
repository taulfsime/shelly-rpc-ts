import {
  shelly_component_id_t,
  shelly_component_key_t,
  shelly_component_type_t,
  shelly_rpc_method_t,
} from './ShellyRpc.js';

export type shelly_device_info_data_t = {
  name: string | null;
  id: shelly_device_id_t;
  mac: shelly_device_mac_t;
  slot: number;
  model: string;
  gen: number;
  fw_id: string;
  ver: string;
  app: string;
  auth_en: boolean;
  auth_domain: string | null;
  discoverable?: boolean;
  profile?: shelly_device_profile_t;
  key?: string;
  batch?: string;
  fw_sbits?: string;
  jti?: string;
  jwt?: {
    aud: string;
    iat: number;
    jti: string;
    v: number;
    p: string;
    n: string;
    url: string;
    f: 0 | 1;
  };
} & {
  [k: `svc${shelly_component_id_t}`]: {
    type: string;
    ver: string;
    build_id: string;
  };
};

export type shelly_device_mac_t =
  `${string}:${string}:${string}:${string}:${string}:${string}`;
export type shelly_device_profile_t = string;
export type shelly_device_timezone_t = string;

export type shelly_device_location_t = {
  tz: shelly_device_timezone_t | null;
  lat: number | null;
  lon: number | null;
};

export type shelly_device_update_stage_t = 'beta' | 'stable' | 'test';
export type shelly_device_update_info_t = {
  version: string;
  build_id: string;
};

export type shelly_device_id_t = string;
export type shelly_device_auth_user_t = 'admin';
export type shelly_device_auth_realm_t = shelly_device_id_t;
export type shelly_device_auth_ha1_t = string | null;

export type shelly_device_rpc_method_map_t = {
  'Shelly.GetStatus': {
    params: never;
    result: never;
  };
  'Shelly.GetConfig': {
    params: never;
    result: never;
  };
  'Shelly.SetConfig': {
    params: never;
    result: never;
  };
  'Shelly.GetDeviceInfo': {
    params?: {
      ident?: boolean;
    };
    result: shelly_device_info_data_t;
  };
  'Shelly.ListMethods': {
    params: never;
    result: {
      methods: shelly_rpc_method_t[];
    };
  };
  'Shelly.ListProfiles': {
    params: never;
    result: {
      profiles: {
        [key: shelly_device_profile_t]: {
          components: {
            type: shelly_component_type_t;
            count: number;
          }[];
        };
      };
    };
  };
  'Shelly.SetProfile': {
    params: {
      name: shelly_device_profile_t;
    };
    result: {
      profile_was: shelly_device_profile_t;
    };
  };
  'Shelly.ListTimezones': {
    params?: {
      offset?: number;
    };
    result: {
      timezones: shelly_device_timezone_t[];
      offset: number;
      total: number;
    };
  };
  'Shelly.DetectLocation': {
    params: never;
    result: shelly_device_location_t;
  };
  'Shelly.CheckForUpdate': {
    params: never;
    result: Partial<
      Record<shelly_device_update_stage_t, shelly_device_update_info_t>
    >;
  };
  'Shelly.Update': {
    params:
      | {
          stage: shelly_device_update_stage_t;
        }
      | {
          url: string;
        };
    result: null;
  };
  'Shelly.FactoryReset': {
    params: never;
    result: null;
  };
  'Shelly.ResetWiFiConfig': {
    params: never;
    result: null;
  };
  'Shelly.Reboot': {
    params?: {
      delay_ms?: number;
    };
    result: null;
  };
  'Shelly.SetAuth': {
    params: {
      user: shelly_device_auth_user_t;
      realm: shelly_device_auth_realm_t;
      ha1: shelly_device_auth_ha1_t;
    };
    result: null;
  };
  'Shelly.PutUserCA': {
    params: {
      data: string | null;
      append: boolean;
    };
    result: {
      len: number;
    };
  };
  'Shelly.PutTLSClientCert': {
    params: {
      data: string | null;
      append: boolean;
    };
    result: {
      len: number;
    };
  };
  'Shelly.PutTLSClientKey': {
    params: {
      data: string | null;
      append: boolean;
    };
    result: {
      len: number;
    };
  };
  'Shelly.GetComponents': {
    params?: {
      offset?: number;
      include?: ('status' | 'config' | 'attrs')[];
      keys?: shelly_component_key_t[];
      dynamic_only?: boolean;
    };
    result: {
      components: {
        key: shelly_component_key_t;
        status?: any; //XXX: Change to specific types
        config?: any; //XXX: Change to specific types
        attrs?: any; //XXX: Change to specific types
      }[];
      cfg_rev: number;
      offset: number;
      total: number;
    };
  };
  'Shelly.InstallAlt': {
    params: {
      stage: shelly_device_update_stage_t;
      app: string;
    };
    result: null;
  };
};
