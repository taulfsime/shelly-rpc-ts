export type shelly_output_component_status_source_t =
  | 'activate' // state change by related input (activate mode)
  | 'analog' // state change by related input (analog mode)
  | 'ble_indicate' // ble control indication
  | 'ble' // ble control
  | 'button' // state change by related input (button mode)
  | 'calibration' // cover: calibrating
  | 'ct_range' // outside ct range
  | 'dim' // dimming started
  | 'dimstop' // dimming stopped
  | 'double' // state change by related input - double push (button mode)
  | 'dual_dim' // dual dimming started
  | 'factory_reset_by_switch' // not sure exactly
  | 'factory_reset' // device factory reset
  | 'http' // command over HTTP
  | 'identify' // from identify command
  | 'init' // restore last state
  | 'knx' // knx
  | 'limit_switch' // cover: limit switch reached
  | 'local' // manual movement of the lever
  | 'long_push' // state change by related input - long push (button mode)
  | 'loopback' // internal change (scripts, schedules?)
  | 'matter' // matter
  | 'Modbus' // modbus
  | 'mqtt' // command over MQTT
  | 'MQTT' // command over MQTT
  | 'night_mode_end_period' // night mode period ended
  | 'night_mode_start_full_period' // night mode - equal times
  | 'night_mode_start_period' // night mode period start
  | 'night_mode_started_period' // night mode period already started
  | 'overcurrent' // when over current error occur
  | 'overpower' // when over power error occur
  | 'overtemp' // when over temperature error occur
  | 'overvoltage_clear' // restored after over voltage error cleared
  | 'overvoltage' // when over voltage error occur
  | 'profile_change' // profiles changed
  | 'reboot' // cover: device rebooted
  | 'RPC' // common over any other RPC channel (fallback)
  | 'safety_switch' // safety switch enabled
  | 'SHC' // command over shelly cloud
  | 'short_push' // state change by related input (button mode) DUPLICATED
  | 'stuck' // lever stuck
  | 'switch' // state changed by related input (toggle/switch mode)
  | 'timeout' // cover: movement timeout
  | 'timer' // auto off/on timer
  | 'transition' // light, rgb, cct: component transition
  | 'ui' // physical UI
  | 'undervoltage_clear' // restored after under voltage error cleared
  | 'undervoltage' // when under voltage error occur
  | 'unknown' // cover: unknown, sorry
  | 'unsupported_load' // unsupported load
  | 'WS_in' // command over inbound websocket (not secured)
  | 'WS_out' // command over outbound websocket (not secured)
  | 'WSS_out' // command over outbound websocket (secured)
  | 'zigbee'; // zigbee

export type shelly_output_component_status_counter_t = {
  total: number;
  by_minute?: [number, number, number];
  minute_ts: number;
};

export type shelly_light_config_fade_rate_t = 1 | 2 | 3 | 4 | 5;
