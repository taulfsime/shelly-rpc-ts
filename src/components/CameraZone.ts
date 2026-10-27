import { shelly_component_id_t } from '../ShellyComponents.js';

export type shelly_camerazone_zone_type_t = 'motion' | 'privacy';

// x, y pairs, 0..10000 of the image width and height; at least 2 points
export type shelly_camerazone_coordinates_t = number[];

export type shelly_camerazone_color_t = [number, number, number];

export type shelly_camerazone_type_t = 'camerazone';
export type shelly_camerazone_key_t =
  `${shelly_camerazone_type_t}:${shelly_component_id_t}`;

export type shelly_camerazone_status_t = {
  id: shelly_component_id_t;
  motion?: boolean; // missing on privacy zones
};

export type shelly_camerazone_config_t = {
  id: shelly_component_id_t;
  coordinates: shelly_camerazone_coordinates_t;
  enable: boolean;
  type: shelly_camerazone_zone_type_t;
  name?: string; // missing when not set
  color?: shelly_camerazone_color_t; // missing when not set
};

export type shelly_camerazone_rpc_method_map_t = {
  'CameraZone.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_camerazone_status_t;
  };
  'CameraZone.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_camerazone_config_t;
  };
  'CameraZone.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: Partial<Omit<shelly_camerazone_config_t, 'id'>>; // null is refused
    };
    result: {
      restart_required: boolean;
    };
  };
};

export type shelly_camerazone_webhook_event_t =
  | 'camerazone.motion'
  | 'camerazone.motion_end';
