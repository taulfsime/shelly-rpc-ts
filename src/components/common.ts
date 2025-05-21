export type shelly_output_component_status_source_t =
  | 'init'
  | 'WS_in'
  | 'http'
  | 'loopback'
  | 'short_push' // power strip button push
  | string;

export type shelly_output_component_status_counter_t = {
  total: number;
  by_minute?: [number, number, number];
  minute_ts: number;
};

export type shelly_light_config_fade_rate_t = 1 | 2 | 3 | 4 | 5;
