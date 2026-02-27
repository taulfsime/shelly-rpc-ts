import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_output_component_status_source_t } from './common.js';
import { optional_recursive_t } from './helpers.js';

type shelly_cb_status_error_t =
  | 'overtemp'
  | `overvoltage:${number}`
  | `undervoltage:${number}`
  | 'lever';

export type shelly_cb_type_t = 'cb';
export type shelly_cb_key_t = `${shelly_cb_type_t}:${shelly_component_id_t}`;

export type shelly_cb_status_t = {
  id: shelly_component_id_t;
  output: boolean;
  source: shelly_output_component_status_source_t;
  total_cycles: number;
  temperature?: {
    tC: number | null;
    tF: number | null;
  };
  errors?: shelly_cb_status_error_t[];
};

export type shelly_cb_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  undervoltage_limit: number;
  voltage_limit: number;
  reaction_delay: number;
};

type shelly_cb_log_record_t = {
  ts: number;
  output: boolean;
  source: string;
};

export type shelly_cb_rpc_method_map_t = {
  'CB.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cb_status_t;
  };
  'CB.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_cb_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'CB.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cb_config_t;
  };
  'CB.Set': {
    params: {
      id: shelly_component_id_t;
      output: false;
    };
    result: {
      was_on: boolean;
    };
  };
  'CB.GetLog': {
    params: {
      id: shelly_component_id_t;
      after?: number;
    };
    result: {
      records: shelly_cb_log_record_t[];
    };
  };
};

export type shelly_cb_webhook_event_t =
  | 'cb.on'
  | 'cb.off'
  | 'cb.undervoltage'
  | 'cb.overvoltage';
