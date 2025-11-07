import { shelly_component_id_t } from '../ShellyComponents.js';

export type shelly_smoke_type_t = 'smoke';
export type shelly_smoke_key_t =
  `${shelly_smoke_type_t}:${shelly_component_id_t}`;

export type shelly_smoke_status_t = {
  id: shelly_component_id_t;
  alarm: boolean;
  mute: boolean;
};

export type shelly_smoke_config_t = {
  id: shelly_component_id_t;
  name: string | null;
};

export type shelly_smoke_rpc_method_map_t = {
  'Smoke.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_smoke_status_t;
  };
  'Smoke.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_smoke_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Smoke.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_smoke_config_t;
  };
  'Smoke.Mute': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
};

export type shelly_smoke_webhook_event_t =
  | 'smoke.alarm'
  | 'smoke.alarm_off'
  | 'smoke.alarm_test';
