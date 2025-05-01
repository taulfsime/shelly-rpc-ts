import { shelly_component_id_t, shelly_component_key_t } from '../ShellyRpc.js';

type shelly_service_status_state_t =
  | 'init'
  | 'running'
  | 'restarting'
  | 'terminated'
  | 'disabled';

type shelly_service_rpc_method_custom_name_t = `Service.${string}`;

export type shelly_service_status_t = {
  etag: string;
  state: shelly_service_status_state_t;
  stats: {
    mem: number;
    mem_peak: number;
  };
  error_msg?: string;
  errors?: string[];
  flags?: string[];
};

export type shelly_service_config_t = null | Record<string, unknown>;

export type shelly_service_rpc_method_map_t = {
  'Service.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_service_status_t;
  };
  'Service.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_service_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Service.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_service_config_t;
  };
  'Service.GetInfo': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      type: string;
      ver: string;
      build_id: string;
      etag: string;
      meta?: Record<string, unknown>;
    };
  };
  'Service.GetResources': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      etag: string;
      vc?: Record<string, shelly_component_key_t>;
    };
  };
  [key: `Service.${string}`]: {
    params: {
      id: shelly_component_id_t;
    };
    result: unknown;
  };
};
