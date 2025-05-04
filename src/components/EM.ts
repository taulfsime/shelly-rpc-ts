import { shelly_component_id_t } from '../ShellyComponents.js';

export type shelly_em_config_ct_type_t =
  | '50A'
  | '80A'
  | '3x63A'
  | '3EMG3'
  | '120A'
  | '400A'
  | '2000A'
  | '50AEMG3';

type shelly_em_status_errors_t =
  | 'power_meter_failure'
  | 'phase_sequence'
  | 'ct_type_not_set';
type shelly_em_status_errors_neutral_t = 'out_of_range:current';
type shelly_em_status_errors_phase_t =
  | 'out_of_range:active_power'
  | 'out_of_range:apparent_power'
  | 'out_of_range:voltage'
  | 'out_of_range:current';

export type shelly_em_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  blink_mode_selector: 'active_energy' | 'apparent_energy';
  phase_selector: 'a' | 'b' | 'c' | 'all';
  monitor_phase_sequence: boolean;
  reverse: {
    a: boolean;
    b: boolean;
    c: boolean;
  };
  ct_type: shelly_em_config_ct_type_t;
};

export type shelly_em_status_t = {
  id: shelly_component_id_t;
  a_current: number | null;
  a_voltage: number | null;
  a_act_power: number | null;
  a_aprt_power: number | null;
  a_pf: number | null;
  a_freq: number | null;
  a_errors?: shelly_em_status_errors_phase_t[];

  b_current: number | null;
  b_voltage: number | null;
  b_act_power: number | null;
  b_aprt_power: number | null;
  b_pf: number | null;
  b_freq: number | null;
  b_errors?: shelly_em_status_errors_phase_t[];

  c_current: number | null;
  c_voltage: number | null;
  c_act_power: number | null;
  c_aprt_power: number | null;
  c_pf: number | null;
  c_freq: number | null;
  c_errors?: shelly_em_status_errors_phase_t[];

  n_current: number | null;
  n_errors?: shelly_em_status_errors_neutral_t[];

  total_current: number | null;
  total_act_power: number | null;
  total_aprt_power: number | null;
  user_calibrated_phase: ('a' | 'b' | 'c')[];

  errors?: shelly_em_status_errors_t[];
};

export type shelly_em_rpc_method_map_t = {
  'EM.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_em_status_t;
  };
  'EM.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_em_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_em_config_t;
  };
  'EM.PhaseToPhaseCalib': {
    params: {
      id: shelly_component_id_t;
      from: 'a' | 'b' | 'c';
      to: 'a' | 'b' | 'c';
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM.PhaseToPhaseCalibReset': {
    params: {
      id: shelly_component_id_t;
      phase: 'a' | 'b' | 'c';
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM.GetCTTypes': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      supported: shelly_em_config_ct_type_t[];
    };
  };
};
