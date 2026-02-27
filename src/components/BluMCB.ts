import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_bthomedevice_status_t,
  shelly_bthomedevice_config_t,
} from './BTHomeComponents/BTHomeDevice.js';
import { optional_recursive_t } from './helpers.js';

type shelly_blumcb_status_errors_t =
  | 'overcurrent'
  | 'overvoltage'
  | 'overpower'
  | 'software'
  | 'mechanical';

export type shelly_blumcb_type_t = 'blumcb';
export type shelly_blumcb_key_t =
  `${shelly_blumcb_type_t}:${shelly_component_id_t}`;

export type shelly_blumcb_status_t = shelly_bthomedevice_status_t & {
  connected: boolean;
  paired: boolean;
  rpc: boolean;
  rsv: number;
  fw_ver: string;
  errors: shelly_blumcb_status_errors_t[];
  current: number;
  voltage: number;
  aenergy: number;
  ret_aenergy: number;
  aprt_power: number;
};

export type shelly_blumcb_config_t = shelly_bthomedevice_config_t & {
  mcb: string;
  current_limit: number;
  voltage_limit: number;
  power_limit: number;
};

export type shelly_blumcb_rpc_method_map_t = {
  'BluMCB.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_blumcb_status_t;
  };
  'BluMCB.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_blumcb_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BluMCB.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_blumcb_config_t;
  };
  'BluMCB.Delete': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'BluMCB.SwitchOff': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'BluMCB.SetCurrentLimit': {
    params: {
      id: shelly_component_id_t;
      current_limit: number;
    };
    result: null;
  };
  'BluMCB.SetVoltageLimit': {
    params: {
      id: shelly_component_id_t;
      voltage_limit: number;
    };
    result: null;
  };
  'BluMCB.SetPowerLimit': {
    params: {
      id: shelly_component_id_t;
      power_limit: number;
    };
    result: null;
  };
  'BluMCB.UpdateFirmware': {
    params: {
      id: shelly_component_id_t;
      url?: string;
    };
    result: null;
  };
  'BluMCB.CheckForUpdates': {
    result: {
      fw_id: string;
    };
  };
};

export type shelly_blumcb_webhook_event_t =
  | 'blumcb.measurement'
  | 'blumcb.protection_activated'
  | 'blumcb.protection_cleared';
