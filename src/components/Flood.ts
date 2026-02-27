import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

type shelly_flood_status_error_t = 'cable_unplugged';

export type shelly_flood_type_t = 'flood';
export type shelly_flood_key_t =
  `${shelly_flood_type_t}:${shelly_component_id_t}`;

export type shelly_flood_status_t = {
  id: shelly_component_id_t;
  alarm: boolean;
  mute: boolean;
  errors?: shelly_flood_status_error_t[];
};

export type shelly_flood_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  alarm_mode: 'disabled' | 'normal' | 'intense' | 'rain' | null;
  report_holdoff: number;
};

export type shelly_flood_rpc_method_map_t = {
  'Flood.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_flood_status_t;
  };
  'Flood.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_flood_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Flood.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_flood_config_t;
  };
};

export type shelly_flood_webhook_event_t =
  | 'flood.alarm'
  | 'flood.alarm_off'
  | 'flood.cable_unplugged';
