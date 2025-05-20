import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_input_status_errors_t = 'out_of_range' | 'read';

export type shelly_input_type_t = 'input';
export type shelly_input_key_t =
  `${shelly_input_type_t}:${shelly_component_id_t}`;

export type shelly_input_event_t =
  | 'btn_down'
  | 'btn_up'
  | 'single_push'
  | 'double_push'
  | 'triple_push'
  | 'long_push';

export type shelly_input_status_t = {
  id: shelly_component_id_t;
  state?: boolean | null;
  percent?: number | null;
  xpercent?: number | null;
  counts?: {
    total: number;
    xtotal?: number | null;
    by_minute?: [number, number, number];
    xby_minute?: [number, number, number] | null;
    minute_ts: number;
  };
  freq?: number;
  xfreq?: number | null;
  errors?: shelly_input_status_errors_t[];
};

export type shelly_input_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  type: 'switch' | 'button' | 'analog' | 'count';
  enable: boolean;
  invert?: boolean;
  factory_reset?: boolean;
  report_thr?: number;
  range_map?: null | [number, number];
  range?: 0 | 1;
  xpercent?: {
    expr: string | null;
    unit: string | null;
  };
  count_rep_thr?: number;
  freq_window?: number;
  freq_rep_thr?: number;
  xcounts?: {
    expr: string | null;
    unit: string | null;
  };
  xfreq?: {
    expr: string | null;
    unit: string | null;
  };
};

export type shelly_input_rpc_method_map_t = {
  'Input.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_input_status_t;
  };
  'Input.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_input_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Input.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_input_config_t;
  };
  'Input.CheckExpression': {
    params: {
      inputs: (null | shelly_component_id_t)[];
      expr: string;
    };
    result: {
      results: [
        string, // input
        string | null, // output
        string | undefined, // error message
      ][];
    };
  };
  'Input.ResetCounters': {
    params: {
      id: shelly_component_id_t;
      type?: ['counts'];
    };
    result: {
      counts: {
        total: number;
      };
    };
  };
  'Input.Trigger': {
    params: {
      id: shelly_component_id_t;
      event: shelly_input_event_t;
    };
    result: null;
  };
};
