import { shelly_component_id_t } from '../../ShellyComponents.js';
import { optional_recursive_t } from '../helpers.js';

export type shelly_irdevice_type_t = 'irdevice';
export type shelly_irdevice_key_t =
  `${shelly_irdevice_type_t}:${shelly_component_id_t}`;

export type shelly_irdevice_config_t = {
  id: shelly_component_id_t;
  name: string;
};

export type shelly_irdevice_status_t = {
  id: shelly_component_id_t;
  learning?: {
    started_at: number;
    timeout: number;
    name: string;
  };
};

export type shelly_irdevice_rpc_method_map_t = {
  'IRDevice.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_irdevice_status_t;
  };
  'IRDevice.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_irdevice_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'IRDevice.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_irdevice_config_t;
  };
  'IRDevice.LearnCode': {
    params: {
      id: shelly_component_id_t;
      name: string;
      timeout?: number;
    };
    result: null;
  };
  'IRDevice.DeleteCode': {
    params: {
      id: shelly_component_id_t;
      name: string;
    };
    result: null;
  };
};
