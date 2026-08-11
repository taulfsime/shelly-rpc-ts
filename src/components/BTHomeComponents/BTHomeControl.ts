import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_cover_key_t } from '../Cover.js';
import { shelly_light_key_t } from '../Light.js';
import { shelly_switch_key_t } from '../Switch.js';
import { optional_recursive_t } from '../helpers.js';
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
  | 'on'
  | 'off'
  | 'toggle'
  | 'dim_up'
  | 'dim_down';

type shelly_bthomecontrol_output_key_t =
  | shelly_cover_key_t
  | shelly_switch_key_t
  | shelly_light_key_t;

export type shelly_bthomecontrol_mapping_t =
  | {
      output: shelly_cover_key_t;
      inputs: shelly_bthomecontrol_input_body_t<{
        action: shelly_bthomecontrol_input_cover_action_t;
      }>[];
    }
  | {
      output: shelly_switch_key_t;
      inputs: shelly_bthomecontrol_input_body_t<{
        action: shelly_bthomecontrol_input_switch_action_t;
      }>[];
    }
  | {
      output: shelly_light_key_t;
      inputs: shelly_bthomecontrol_input_body_t<{
        action: shelly_bthomecontrol_input_light_action_t;
      }>[];
    };

type shelly_bthomecontrol_learning_stage_t =
  | 'pairing'
  | 'press'
  | 'done'
  | 'remove'
  | 'error';

type shelly_bthomecontrol_learning_err_t = {
  code: number;
  msg: string | null;
};

export type shelly_bthomecontrol_type_t = 'bthomecontrol';
export type shelly_bthomecontrol_key_t =
  `${shelly_bthomecontrol_type_t}:${shelly_component_id_t}`;

export type shelly_bthomecontrol_config_t = {
  id: shelly_component_id_t;
  blu_remote_cover_mode?: 0 | 1;
};

export type shelly_bthomecontrol_status_t = {
  id: shelly_component_id_t;
  learning?: {
    stage: shelly_bthomecontrol_learning_stage_t;
    err: shelly_bthomecontrol_learning_err_t | null;
    ts: number;
    duration: number | null;
  };
};

export type shelly_bthomecontrol_rpc_method_map_t = {
  'BTHomeControl.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bthomecontrol_status_t;
  };
  'BTHomeControl.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_bthomecontrol_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BTHomeControl.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bthomecontrol_config_t;
  };
  'BTHomeControl.StartLearning': {
    params: {
      input_id?: shelly_component_id_t;
      component_key?: shelly_bthomecontrol_output_key_t;
    };
    result: null;
  };
  'BTHomeControl.StopLearning': {
    params?: {};
    result: null;
  };
  'BTHomeControl.DeleteAll': {
    params?: {
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
    } & shelly_bthomecontrol_mapping_t;
  };
  'BTHomeControl.Create': {
    params: shelly_bthomecontrol_mapping_t;
    result: {
      id: shelly_component_id_t;
    };
  };
  'BTHomeControl.Update': {
    params: {
      id: shelly_component_id_t;
    } & shelly_bthomecontrol_mapping_t;
    result: null;
  };
  'BTHomeControl.Enumerate': {
    params?: {};
    result: null | {
      [key: shelly_bthomecontrol_output_key_t]: shelly_component_id_t;
    };
  };
};
