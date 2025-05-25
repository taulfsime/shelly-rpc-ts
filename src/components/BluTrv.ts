import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_bthomedevice_status_t,
  shelly_bthomedevice_config_t,
} from './BTHomeComponents/BTHomeDevice.js';
import { shelly_bthomesensor_key_t } from './BTHomeComponents/BTHomeSensor.js';

export type shelly_blutrv_type_t = 'blutrv';
export type shelly_blutrv_key_t =
  `${shelly_blutrv_type_t}:${shelly_component_id_t}`;

export type shelly_blutrv_status_t = shelly_bthomedevice_status_t & {
  target_C: number;
  current_C: number;
  pos: number;
  paired: boolean;
  rpc: boolean;
  rsv: number;
};

export type shelly_blutrv_config_t = shelly_bthomedevice_config_t & {
  trv: string;
  temp_sensors: shelly_bthomesensor_key_t[];
  dw_sensors: shelly_bthomesensor_key_t[];
};

export type shelly_blutrv_rpc_method_map_t = {
  'BluTrv.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_blutrv_status_t;
  };
  'BluTrv.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_blutrv_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BluTrv.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_blutrv_config_t;
  };
  'BluTrv.Delete': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'BluTrv.UpdateFirmware': {
    params: {
      id: shelly_component_id_t;
      bootloader?: boolean;
      url?: string;
    };
    result: null;
  };
  'BluTrv.CheckForUpdates': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      fw_id: string;
    };
  };
  //XXX:
  'BluTrv.Call': {
    params: {
      id: shelly_component_id_t;
      method: string;
      params?: unknown;
    };
    result: unknown;
  };
};
