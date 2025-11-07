import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_humidity_status_errors_t = 'out_of_range' | 'read';

export type shelly_humidity_type_t = 'humidity';
export type shelly_humidity_key_t =
  `${shelly_humidity_type_t}:${shelly_component_id_t}`;

export type shelly_humidity_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  report_thr: number;
  offset: number;
};

export type shelly_humidity_status_t = {
  id: shelly_component_id_t;
  rh: number | null;
  errors?: shelly_humidity_status_errors_t[];
};

export type shelly_humidity_rpc_method_map_t = {
  'Humidity.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_humidity_status_t;
  };
  'Humidity.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_humidity_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Humidity.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_humidity_config_t;
  };
};

export type shelly_humidity_webhook_event_t =
  | 'humidity.change'
  | 'humidity.measurement';
