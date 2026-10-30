import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_doorwindow_type_t = 'doorwindow';
export type shelly_doorwindow_key_t =
  `${shelly_doorwindow_type_t}:${shelly_component_id_t}`;

export type shelly_doorwindow_attrs_t = {
  rotation?: {
    unit: string;
  };
};

export type shelly_doorwindow_status_t = {
  id: shelly_component_id_t;
  open: boolean | null;
  tilt?: boolean | null;
  rotation?: number | null;
  errors?: string[];
};

export type shelly_doorwindow_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  rotation_enable?: boolean;
};

export type shelly_doorwindow_rpc_method_map_t = {
  'DoorWindow.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_doorwindow_status_t;
  };
  'DoorWindow.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_doorwindow_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'DoorWindow.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_doorwindow_config_t;
  };
};

export type shelly_doorwindow_webhook_event_t =
  | 'doorwindow.open'
  | 'doorwindow.close';
