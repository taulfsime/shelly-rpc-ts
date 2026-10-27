import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_bthomedevice_config_t,
  shelly_bthomedevice_key_t,
  shelly_bthomedevice_type_t,
} from './BTHomeComponents/BTHomeDevice.js';
import {
  shelly_bthomesensor_config_t,
  shelly_bthomesensor_key_t,
  shelly_bthomesensor_object_id_t,
  shelly_bthomesensor_object_type_t,
  shelly_bthomesensor_type_t,
} from './BTHomeComponents/BTHomeSensor.js';
import { optional_recursive_t } from './helpers.js';

type shelly_bthome_status_errors_t =
  | 'bluetooth_disabled'
  | 'encryption_counter_near_limit'
  | 'encryption_counter_exhausted';

export type shelly_bthome_type_t = 'bthome';
export type shelly_bthome_key_t = shelly_bthome_type_t;

export type shelly_bthome_config_t = {};

export type shelly_bthome_status_t = {
  discovery?: {
    started_at: number;
    duration: number;
  };
  errors?: shelly_bthome_status_errors_t[];
};

export type shelly_bthome_discovered_device_t = {
  addr: string;
  local_name: string;
  rssi: number;
  encrypted: boolean;
  shelly_mfdata: {
    flags: number;
    model_id: number;
    mac: string;
  };
};

export type shelly_bthome_device_discovered_event_t = {
  component: shelly_bthome_key_t;
  event: 'device_discovered';
  device: shelly_bthome_discovered_device_t;
  ts: number;
};

export type shelly_bthome_discovery_done_event_t = {
  component: shelly_bthome_key_t;
  event: 'discovery_done';
  device_count: number;
  ts: number;
};

export type shelly_bthome_component_type_t =
  | shelly_bthomedevice_type_t
  | shelly_bthomesensor_type_t;

export type shelly_bthome_rpc_method_map_t = {
  'BTHome.GetStatus': {
    params?: {};
    result: shelly_bthome_status_t;
  };
  'BTHome.SetConfig': {
    params: {
      config: optional_recursive_t<shelly_bthome_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BTHome.GetConfig': {
    params?: {};
    result: shelly_bthome_config_t;
  };
  'BTHome.AddDevice': {
    params: {
      config: {
        [key in keyof Omit<
          shelly_bthomedevice_config_t,
          'id'
        >]?: shelly_bthomedevice_config_t[key];
      };
      id?: shelly_component_id_t;
      attrs?: {
        model_id: number;
        model_idname?: string;
      };
    };
    result: {
      added: shelly_bthomedevice_key_t;
    };
  };
  'BTHome.DeleteDevice': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'BTHome.AddSensor': {
    params: {
      config: Pick<shelly_bthomesensor_config_t, 'addr' | 'obj_id' | 'idx'> &
        Partial<Pick<shelly_bthomesensor_config_t, 'name' | 'meta'>>;
      id?: shelly_component_id_t;
    };
    result: {
      added: shelly_bthomesensor_key_t;
    };
  };
  'BTHome.DeleteSensor': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'BTHome.StartDeviceDiscovery': {
    params?: {
      duration?: number; // seconds
      rssi_thr?: number; // dBm, negative
      auto_add_models?: number[]; // model ids added as they are found
    };
    result: null;
  };
  'BTHome.GetObjectInfos': {
    params: {
      obj_ids: shelly_bthomesensor_object_id_t[];
      offset?: number;
    };
    result: {
      offset: number;
      total: number;
      count: number;
      objects: {
        obj_id: shelly_bthomesensor_object_id_t;
        obj_name: string;
        type: shelly_bthomesensor_object_type_t;
        unit: string;
      }[];
    };
  };
  'BTHome.ResetEncryptionCounter': {
    params?: {};
    result: null;
  };
};
