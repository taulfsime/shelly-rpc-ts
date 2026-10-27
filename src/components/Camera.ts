import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_camerazone_coordinates_t,
  shelly_camerazone_color_t,
  shelly_camerazone_zone_type_t,
} from './CameraZone.js';

type nullable_partial_t<T> = {
  [P in keyof T]?: T[P] extends object
    ? nullable_partial_t<T[P]> | null
    : T[P] | null;
};

// "1920x1080@30": size and frames per second
export type shelly_camera_resolution_t = string;

export type shelly_camera_sensitivity_t =
  | 'very_low'
  | 'low'
  | 'medium'
  | 'high'
  | 'very_high';

export type shelly_camera_streamer_state_t =
  | 'stopped'
  | 'starting'
  | 'running'
  | 'stopping';

export type shelly_camera_stream_config_t = {
  resolution: shelly_camera_resolution_t;
  bitrate: number; // kbps
};

// what started a recording: the motion event of the camera or one of its zones
export type shelly_camera_trigger_t = {
  component: string;
  event: string;
  ts: number;
};

export type shelly_camera_recording_t = {
  ts: number;
  stream: number;
  duration?: number; // seconds
  trigger?: shelly_camera_trigger_t;
};

export type shelly_camera_capabilities_t = {
  resolutions: shelly_camera_resolution_t[];
  bitrate_range: [number, number]; // kbps
  detect: string[];
  max_zones: number;
  zone_type: string[];
  sounds: string[];
};

type shelly_camera_status_errors_t = 'streamer_fs_bad';

export type shelly_camera_type_t = 'camera';
export type shelly_camera_key_t =
  `${shelly_camera_type_t}:${shelly_component_id_t}`;

export type shelly_camera_status_t = {
  id: shelly_component_id_t;
  arm: boolean; // motion detection is on
  privacy: boolean; // the camera shows and records nothing
  streamer: shelly_camera_streamer_state_t;
  motion: boolean;
  streams: number; // live viewers
  recording_encryption: {
    configured: boolean;
    fingerprint?: string;
  };
  streamer_version?: string;
  factory_test_mode?: boolean;
  sys_btn_down?: boolean;
  recordings?: Record<string, shelly_camera_recording_t> | null; // running recordings by id
  errors?: shelly_camera_status_errors_t[];
};

export type shelly_camera_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  led: {
    enable: boolean;
  };
  audio: {
    input: {
      enable: boolean;
    };
    output: {
      volume: number; // 0..100
    };
  };
  sounds: {
    enable: boolean; // the chimes the camera plays by itself
  };
  motion: {
    sensitivity: shelly_camera_sensitivity_t;
    recording: {
      enable: boolean;
    };
  };
  night_vision: {
    mode: 'auto' | 'day' | 'night';
    ir_leds?: boolean; // only on models with infrared LEDs
    light_threshold: number; // 0..100
    sensitivity: number; // 0..100
  };
  rtsp: {
    enable: boolean;
  };
  video: {
    brightness: number; // 0..100
    contrast: number; // 0..100
    flip: boolean;
    mirror: boolean;
    saturation: number; // 0..100
    sharpness: number; // 0..100
    tint: number; // -256..256
    temperature: number; // -256..256
    antiflicker: '50Hz' | '60Hz';
  };
  streams: Record<`${number}`, shelly_camera_stream_config_t>; // by stream id; the last one below 720p
};

export type shelly_camera_rpc_method_map_t = {
  'Camera.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_camera_status_t;
  };
  'Camera.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_camera_config_t;
  };
  'Camera.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: nullable_partial_t<Omit<shelly_camera_config_t, 'id'>>; // null restores the default
    };
    result: {
      restart_required: boolean;
    };
  };
  'Camera.GetCapabilities': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_camera_capabilities_t;
  };
  'Camera.Set': {
    params:
      | {
          id: shelly_component_id_t;
          arm: boolean;
          privacy?: boolean;
        }
      | {
          id: shelly_component_id_t;
          arm?: boolean;
          privacy: boolean;
        };
    result: null;
  };
  'Camera.CaptureImage': {
    params: {
      id: shelly_component_id_t;
      stream?: number;
    };
    result: {
      media_id: string;
    };
  };
  'Camera.StartRecording': {
    params: {
      id: shelly_component_id_t;
      duration?: number; // seconds, default 60
      stream?: number;
    };
    result: {
      rec_id: string;
    };
  };
  'Camera.StopRecording': {
    params: {
      id: shelly_component_id_t;
      rec_id?: string; // without it every running recording stops
    };
    result: null;
  };
  'Camera.PlaySound': {
    params:
      | {
          id: shelly_component_id_t;
          sound: string; // one of the capabilities' sounds
        }
      | {
          id: shelly_component_id_t;
          file: string; // a file uploaded with Storage.UploadSound
        };
    result: null;
  };
  'Camera.AddZone': {
    params: {
      id: shelly_component_id_t;
      coordinates: shelly_camerazone_coordinates_t;
      enable?: boolean;
      type?: shelly_camerazone_zone_type_t;
      name?: string;
      color?: shelly_camerazone_color_t;
    };
    result: {
      zone_id: shelly_component_id_t;
    };
  };
  'Camera.DeleteZone': {
    params: {
      id: shelly_component_id_t;
      zone_id: shelly_component_id_t;
    };
    result: null;
  };
};

export type shelly_camera_webhook_event_t =
  | 'camera.motion'
  | 'camera.motion_end'
  | 'camera.privacy_on'
  | 'camera.privacy_off'
  | 'camera.armed'
  | 'camera.disarmed';
