import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_cover_key_t } from '../Cover.js';
import { shelly_light_key_t } from '../Light.js';
import { shelly_switch_key_t } from '../Switch.js';
import {
  shelly_bthomedevice_event_t,
  shelly_bthomedevice_key_t,
} from './BTHomeDevice.js';
import {
  shelly_bthomesensor_object_id_t,
  shelly_bthomesensor_object_index_t,
} from './BTHomeSensor.js';

type shelly_bthomecontrol_input_body_t<T = null> = {
  [key: shelly_bthomedevice_key_t]: {
    [
      obj_key: `${shelly_bthomesensor_object_id_t}:${shelly_bthomesensor_object_index_t}`
    ]: {
      [K in
        | shelly_bthomedevice_event_t
        | `${shelly_bthomedevice_event_t}@${number}`]?: T;
    };
  };
};

type shelly_bthomecontrol_input_cover_action_t =
  | 'close'
  | 'open'
  | 'cycle'
  | 'step_up'
  | 'step_down';
type shelly_bthomecontrol_input_switch_action_t = 'on' | 'off' | 'toggle';
type shelly_bthomecontrol_input_light_action_t =
  | 'dim_up'
  | 'dim_down'
  | 'toggle';

export type shelly_bthomecontrol_rpc_method_map_t = {
  'BTHomeControl.StartLearning': {
    params: {
      input_id: shelly_component_id_t;
    };
    result: null;
  };
  'BTHomeControl.StopLearning': {
    params: {
      input_id: shelly_component_id_t;
    };
    result: null;
  };
  'BTHomeControl.DeleteAll': {
    params: {
      id?: shelly_component_id_t;
    };
    result: null;
  };
  'BTHomeControl.List': {
    params: {
      id: shelly_component_id_t;
      offset?: number;
    };
    result: {
      id: shelly_component_id_t;
      offset: number;
      total: number;
    } & (
      | {
          output: shelly_cover_key_t;
          inputs: shelly_bthomecontrol_input_body_t<shelly_bthomecontrol_input_cover_action_t>[];
        }
      | {
          output: shelly_switch_key_t;
          inputs: shelly_bthomecontrol_input_body_t<shelly_bthomecontrol_input_switch_action_t>[];
        }
      | {
          output: shelly_light_key_t;
          inputs: shelly_bthomecontrol_input_body_t<shelly_bthomecontrol_input_light_action_t>[];
        }
    );
  };
};
