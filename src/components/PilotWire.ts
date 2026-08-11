import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_output_component_status_counter_t } from './common.js';
import { optional_recursive_t } from './helpers.js';

type shelly_pilotwire_mode_t =
  | 'comfort'
  | 'eco'
  | 'frost_protect'
  | 'off'
  | 'comfort-1'
  | 'comfort-2';

type shelly_pilotwire_initial_mode_t = shelly_pilotwire_mode_t | 'restore_last';

type shelly_pilotwire_status_errors_t =
  | 'overcurrent'
  | 'overpower'
  | 'overvoltage'
  | 'undervoltage'
  | 'overtemp';

export type shelly_pilotwire_type_t = 'pilotwire';
export type shelly_pilotwire_key_t =
  `${shelly_pilotwire_type_t}:${shelly_component_id_t}`;

export type shelly_pilotwire_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  initial_mode: shelly_pilotwire_initial_mode_t;
  power_limit?: number;
  voltage_limit?: number;
  undervoltage_limit?: number;
  current_limit?: number;
};

export type shelly_pilotwire_status_t = {
  id: shelly_component_id_t;
  mode: shelly_pilotwire_mode_t;
  apower?: number;
  voltage?: number;
  current?: number;
  freq?: number;
  pf?: number;
  aenergy?: shelly_output_component_status_counter_t;
  temperature?: {
    tC: null | number;
    tF: null | number;
  };
  errors?: shelly_pilotwire_status_errors_t[];
};

export type shelly_pilotwire_rpc_method_map_t = {
  'PilotWire.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_pilotwire_status_t;
  };
  'PilotWire.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_pilotwire_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'PilotWire.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_pilotwire_config_t;
  };
  'PilotWire.Set': {
    params: {
      id: shelly_component_id_t;
      mode: shelly_pilotwire_mode_t;
    };
    result: null;
  };
};

export type shelly_pilotwire_webhook_event_t = 'pilotwire.mode_change';
