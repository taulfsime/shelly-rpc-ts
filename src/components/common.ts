export type shelly_output_component_status_source_t =
  | 'init'
  | 'WS_in'
  | 'http'
  | string;

export type shelly_output_component_status_counter_t = {
  total: number;
  by_minute?: [number, number, number];
  minute_ts: number;
};

export type shelly_virtual_component_status_source_t =
  | ''
  | 'rpc'
  | 'sys'
  | 'err';
