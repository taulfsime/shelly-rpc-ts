import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_script_status_errors_t =
  | 'crashed'
  | 'syntax_error'
  | 'reference_error'
  | 'type_error'
  | 'out_of_memory'
  | 'out_of_codespace'
  | 'internal_error'
  | 'not_implemented'
  | 'file_read_error'
  | 'bad_arguments';

export type shelly_script_type_t = 'script';
export type shelly_script_key_t =
  `${shelly_script_type_t}:${shelly_component_id_t}`;

export type shelly_script_status_t = {
  id: shelly_component_id_t;
  running: boolean;
  errors?: shelly_script_status_errors_t[];
};

export type shelly_script_config_t = {
  id: shelly_component_id_t;
  name: string;
  enable: boolean;
};

export type shelly_script_rpc_method_map_t = {
  'Script.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_script_status_t;
  };
  'Script.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_script_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Script.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_script_config_t;
  };
  'Script.Create': {
    params: {
      name?: string;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'Script.PutCode': {
    params: {
      id: shelly_component_id_t;
      code: string;
      append?: boolean;
    };
    result: {
      len: number;
    };
  };
  'Script.GetCode': {
    params: {
      id: shelly_component_id_t;
      offset?: number;
      len?: number;
    };
    result: {
      data: string;
      left: number;
    };
  };
  'Script.Eval': {
    params: {
      id: shelly_component_id_t;
      code: string;
    };
    result: {
      result: string;
    };
  };
  'Script.Start': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      was_running: boolean;
    };
  };
  'Script.Stop': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      was_running: boolean;
    };
  };
  'Script.List': {
    params: never;
    result: {
      scripts: {
        id: shelly_component_id_t;
        name: string;
        enable: boolean;
        running: boolean;
      }[];
    };
  };
  'Script.Delete': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};
