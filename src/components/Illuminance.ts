import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

type shelly_illuminance_illumination_t = 'dark' | 'twilight' | 'bright';

type shelly_illuminance_status_error_t = 'out_of_range' | 'read';

export type shelly_illuminance_type_t = 'illuminance';
export type shelly_illuminance_key_t =
  `${shelly_illuminance_type_t}:${shelly_component_id_t}`;

export type shelly_illuminance_status_t = {
  id: shelly_component_id_t;
  lux: number | null;
  illumination: shelly_illuminance_illumination_t | null;
  errors?: shelly_illuminance_status_error_t[];
};

export type shelly_illuminance_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  dark_thr: number;
  bright_thr: number;
};

export type shelly_illuminance_rpc_method_map_t = {
  'Illuminance.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_illuminance_status_t;
  };
  'Illuminance.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_illuminance_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Illuminance.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_illuminance_config_t;
  };
};

export type shelly_illuminance_webhook_event_t = 'illuminance.change';
