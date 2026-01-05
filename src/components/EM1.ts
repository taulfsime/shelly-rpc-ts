import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_em_config_ct_type_t } from './EM.js';
import { optional_recursive_t } from './helpers.js';

type shelly_em1_status_errors_t =
  | 'power_meter_failure'
  | 'out_of_range:act_power'
  | 'out_of_range:aprt_power'
  | 'out_of_range:voltage'
  | 'out_of_range:current'
  | 'ct_type_not_set';
type shelly_em1_status_flags_t = 'count_disabled';

export type shelly_em1_type_t = 'em1';
export type shelly_em1_key_t = `${shelly_em1_type_t}:${shelly_component_id_t}`;

export type shelly_em1_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  reverse: boolean;
  ct_type: shelly_em_config_ct_type_t;
};

export type shelly_em1_status_t = {
  id: shelly_component_id_t;
  current: number | null;
  voltage: number | null;
  act_power: number | null;
  aprt_power: number | null;
  pf: number | null;
  freq: number | null;
  calibration: 'factory' | shelly_em1_key_t;
  errors?: shelly_em1_status_errors_t[];
  status?: shelly_em1_status_flags_t[];
};

export type shelly_em1_rpc_method_map_t = {
  'EM1.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_em1_status_t;
  };
  'EM1.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_em1_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM1.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_em1_config_t;
  };
  'EM1.CalibrateFrom': {
    params: {
      id: shelly_component_id_t;
      other_id: shelly_component_id_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM1.RevertToFactoryCalibration': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM1.GetCTTypes': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      supported: shelly_em_config_ct_type_t[];
    };
  };
};

export type shelly_em1_webhook_event_t =
  | 'em1.voltage_change'
  | 'em1.current_change'
  | 'em1.active_power_change';
