import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';
import { shelly_presencezone_config_t } from './PresenceZone.js';

type shelly_presence_sensor_position_t = 'left' | 'center' | 'right';

type shelly_presence_sensor_power_t = 'low' | 'medium' | 'high';

type shelly_presence_config_sensor_state_t = {
  det_act_thr: number;
  det_free_thr: number;
  act_free_thr: number;
  stat_free_thr: number;
  sleep_free_thr: number;
};

type shelly_presence_config_sensor_t = {
  flipped: boolean;
  height: number;
  tilt: number;
  points: number;
  velocity: number;
  snr: number;
  max_velocity: number;
  position: shelly_presence_sensor_position_t;
  power: shelly_presence_sensor_power_t;
  state: shelly_presence_config_sensor_state_t;
};

type shelly_presence_config_leds_t = {
  brightness: number;
  night_mode: {
    enable: boolean;
    brightness: number;
    active_between: [string, string] | [];
  };
};

export type shelly_presence_type_t = 'presence';
export type shelly_presence_key_t = shelly_presence_type_t;

export type shelly_presence_status_t = {
  live_track?: {
    timer_started_at: number;
    timer_duration: number;
    interval: number;
  };
};

export type shelly_presence_config_t = {
  enable: boolean;
  zmin: number | null;
  zmax: number | null;
  sensor: shelly_presence_config_sensor_t;
  ui: {
    imperial: boolean;
  };
  blind: [number, number, number, number][];
  leds: shelly_presence_config_leds_t;
  main_zone: string;
};

export type shelly_presence_rpc_method_map_t = {
  'Presence.GetStatus': {
    params?: {};
    result: shelly_presence_status_t;
  };
  'Presence.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_presence_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Presence.GetConfig': {
    params?: {};
    result: shelly_presence_config_t;
  };
  'Presence.AddZone': {
    params: {
      config: Omit<shelly_presencezone_config_t, 'id'>;
    };
    result: {
      added: string;
    };
  };
  'Presence.DeleteZone': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Presence.TiltCalibrate': {
    params?: {};
    result: null;
  };
  'Presence.LiveTrack': {
    params?: {};
    result: null;
  };
  'Presence.SetSensor': {
    params: {
      enable: boolean;
    };
    result: null;
  };
};
