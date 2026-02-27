import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_presencezone_type_t = 'presencezone';
export type shelly_presencezone_key_t =
  `${shelly_presencezone_type_t}:${shelly_component_id_t}`;

export type shelly_presencezone_status_t = {
  id: shelly_component_id_t;
  state: boolean;
  num_objects: number;
};

export type shelly_presencezone_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  enable: boolean;
  color: [number, number, number];
  area: [number, number, number, number][];
  presence_delay?: number | null;
  absence_delay?: number | null;
};

export type shelly_presencezone_rpc_method_map_t = {
  'PresenceZone.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_presencezone_status_t;
  };
  'PresenceZone.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_presencezone_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'PresenceZone.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_presencezone_config_t;
  };
};

export type shelly_presencezone_webhook_event_t =
  | 'presencezone.presence'
  | 'presencezone.counter'
  | 'presencezone.enter'
  | 'presencezone.leave';
