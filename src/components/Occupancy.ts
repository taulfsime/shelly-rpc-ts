import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_occupancy_type_t = 'occupancy';
export type shelly_occupancy_key_t =
  `${shelly_occupancy_type_t}:${shelly_component_id_t}`;

export type shelly_occupancy_status_t = {
  id: shelly_component_id_t;
  value: boolean;
  errors?: string[];
};

export type shelly_occupancy_config_t = {
  id: shelly_component_id_t;
  wake_screen: boolean;
};

export type shelly_occupancy_rpc_method_map_t = {
  'Occupancy.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_occupancy_status_t;
  };
  'Occupancy.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_occupancy_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Occupancy.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_occupancy_config_t;
  };
};

export type shelly_occupancy_webhook_event_t =
  | 'occupancy.object_enter'
  | 'occupancy.object_leave';
