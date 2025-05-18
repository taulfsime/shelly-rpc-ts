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

type shelly_bthome_status_errors_t = 'bluetooth_disabled';

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

export type shelly_bthome_component_type_t =
  | shelly_bthomedevice_type_t
  | shelly_bthomesensor_type_t;

export type shelly_bthome_rpc_method_map_t = {
  'BTHome.GetStatus': {
    params: never;
    result: shelly_bthome_status_t;
  };
  'BTHome.SetConfig': {
    params: {
      config: shelly_bthome_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BTHome.GetConfig': {
    params: never;
    result: shelly_bthome_config_t;
  };
  'BTHome.AddDevice': {
    params: {
      config: Omit<shelly_bthomedevice_config_t, 'id'>;
      id?: shelly_component_id_t;
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
      config: Omit<shelly_bthomesensor_config_t, 'id'>;
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
    params: {
      duration: number;
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
};
