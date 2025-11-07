import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_output_component_status_counter_t,
  shelly_output_component_status_source_t,
} from './common.js';
import { only_one_prop_t } from './helpers.js';

export type shelly_cover_type_t = 'cover';
export type shelly_cover_key_t =
  `${shelly_cover_type_t}:${shelly_component_id_t}`;

type shelly_cover_status_errors_t =
  | 'overtemp'
  | 'overpower'
  | 'overvoltage'
  | 'undervoltage'
  | 'overcurrent'
  | 'obstruction'
  | 'safety_switch'
  | 'bad_feedback:rotating_in_wrong_direction'
  | 'bad_feedback:both_directions_active'
  | 'bad_feedback:failed_to_halt'
  | 'cal_abort:timeout_open'
  | 'cal_abort:timeout_close'
  | 'cal_abort:safety'
  | 'cal_abort:ext_command'
  | 'cal_abort:bad_feedback'
  | 'cal_abort:implausible_time_to_fully_close'
  | 'cal_abort:implausible_time_to_fully_open'
  | 'cal_abort:implausible_power_consumption_in_close_dir'
  | 'cal_abort:implausible_power_consumption_in_open_dir'
  | 'cal_abort:too_many_steps_to_close'
  | 'cal_abort:too_few_steps_to_close'
  | 'cal_abort:implausible_time_to_fully_close_w_steps'
  | 'cal_abort:implausible_step_duration_in_open_dir'
  | 'cal_abort:too_many_steps_to_open'
  | 'cal_abort:too_few_steps_to_open'
  | 'cal_abort:implausible_time_to_fully_open_w_steps';

export type shelly_cover_status_t = {
  id: shelly_component_id_t;
  source: shelly_output_component_status_source_t;
  state: 'open' | 'closed' | 'opening' | 'closing' | 'stopped' | 'calibrating';
  apower: number;
  voltage: number;
  current: number;
  pf: number;
  freq: number;
  aenergy: shelly_output_component_status_counter_t;
  current_pos: number | null;
  target_pos: number | null;
  move_timeout?: number;
  move_started_at?: number;
  pos_control: boolean;
  last_direction: 'open' | 'close' | null;
  temperature?: {
    tC: null | number;
    tF: null | number;
  };
  slat_pos?: number | null;
  errors?: shelly_cover_status_errors_t[];
};

type shelly_cover_rpc_go_to_position_params_t = (
  | only_one_prop_t<{ pos: number; rel: number }>
  | only_one_prop_t<{ slat_pos: number; slat_rel: number }>
  | (only_one_prop_t<{ pos: number; rel: number }> &
      only_one_prop_t<{ slat_pos: number; slat_rel: number }>)
) & {
  id: shelly_component_id_t;
};

export type shelly_cover_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  in_mode: 'single' | 'dual' | 'detached';
  in_locked: boolean;
  initial_state: 'open' | 'closed' | 'stopped';
  power_limit: number;
  voltage_limit: number;
  undervoltage_limit: number;
  current_limit: number;
  motor: {
    idle_power_thr: number;
    idle_confirm_period: number;
  };
  maxtime_open: number;
  maxtime_close: number;
  swap_inputs?: boolean;
  invert_directions: boolean;
  maintenance_mode: boolean;
  obstruction_detection: {
    enable: boolean;
    direction: 'open' | 'close' | 'both';
    action: 'stop' | 'reverse';
    power_thr: number;
    holdoff: number;
  };
  safety_switch?: {
    enable: boolean;
    direction: 'open' | 'close' | 'both';
    action: 'stop' | 'reverse' | 'pause';
    allowed_move: null | 'reverse';
  };
  slat?: {
    enable: boolean;
    open_time: number;
    close_time: number;
    step: number;
    retain_pos: boolean;
    precise_ctl: boolean;
  };
};

export type shelly_cover_rpc_method_map_t = {
  'Cover.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cover_status_t;
  };
  'Cover.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_cover_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Cover.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cover_config_t;
  };
  'Cover.Calibrate': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Cover.Open': {
    params: {
      id: shelly_component_id_t;
      duration?: number;
    };
    result: null;
  };
  'Cover.Close': {
    params: {
      id: shelly_component_id_t;
      duration?: number;
    };
    result: null;
  };
  'Cover.Stop': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Cover.GoToPosition': {
    params: shelly_cover_rpc_go_to_position_params_t;
    result: null;
  };
  'Cover.ResetCounters': {
    params: {
      id: shelly_component_id_t;
      type?: ['aenergy'];
    };
    result: {
      aenergy: {
        total: number;
      };
    };
  };
};

export type shelly_cover_webhook_event_t =
  | 'cover.stopped'
  | 'cover.open'
  | 'cover.closed'
  | 'cover.opening'
  | 'cover.closing';
