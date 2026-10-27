import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_camera_trigger_t } from './Camera.js';

type shelly_storage_status_errors_t = string;

export type shelly_storage_media_t = {
  media_id: string;
  type: 'image' | 'video';
  ts: number;
  duration?: number; // seconds, videos only
  size?: number; // bytes
  trigger?: shelly_camera_trigger_t;
  url: string;
  thumbnail_url?: string;
};

export type shelly_storage_type_t = 'storage';
export type shelly_storage_key_t =
  `${shelly_storage_type_t}:${shelly_component_id_t}`;

export type shelly_storage_status_t = {
  id: shelly_component_id_t;
  rev: number; // counts every change to the media list
  sounds_rev: number;
  fs_free: number; // bytes
  fs_size: number; // bytes
  present: boolean; // a card or a share is there
  active: boolean;
  errors?: shelly_storage_status_errors_t[]; // needs_formatting, mounting, mount_failed, ...
};

export type shelly_storage_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  nfs?: {
    host: string | null;
    path: string | null;
  };
  cifs?: {
    host: string | null;
    share: string | null;
    user: string | null;
  };
};

export type shelly_storage_rpc_method_map_t = {
  'Storage.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_storage_status_t;
  };
  'Storage.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_storage_config_t;
  };
  'Storage.SetConfig': {
    params: {
      id: shelly_component_id_t;
      // null clears a field (a share: all of it); setting one share clears the other
      config: {
        name?: string | null;
        nfs?: {
          host?: string | null;
          path?: string | null;
        } | null;
        cifs?: {
          host?: string | null;
          share?: string | null;
          user?: string | null;
          pass?: string | null;
        } | null;
      };
    };
    result: {
      restart_required: boolean;
    };
  };
  'Storage.List': {
    params: {
      id: shelly_component_id_t;
      offset?: number;
    };
    result: {
      offset: number;
      items: shelly_storage_media_t[]; // up to 100
      rev: number;
      total: number;
    };
  };
  'Storage.Delete': {
    params: {
      id: shelly_component_id_t;
      media_id: string;
    };
    result: null;
  };
  'Storage.Eject': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Storage.Format': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Storage.UploadSound': {
    params: {
      id: shelly_component_id_t;
      name: string;
      offset: number;
      data: string; // base64 encoded chunk
      final?: boolean;
    };
    result: {
      file: string; // the path to pass to Camera.PlaySound, once final
    } | null;
  };
  'Storage.ListSounds': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      sounds: string[];
    };
  };
  'Storage.DeleteSound': {
    params: {
      id: shelly_component_id_t;
      file: string;
    };
    result: null;
  };
};
