import { shelly_component_id_t } from '../../ShellyComponents.js';
import { optional_recursive_t } from '../helpers.js';

export type shelly_ircode_type_t = 'ircode';
export type shelly_ircode_key_t =
  `${shelly_ircode_type_t}:${shelly_component_id_t}`;

export type shelly_ircode_config_t = {
  id: shelly_component_id_t;
  name: string;
  device_id: shelly_component_id_t;
};

export type shelly_ircode_status_t = {
  id: shelly_component_id_t;
  symbols: number;
};

export type shelly_ircode_rpc_method_map_t = {
  'IRCode.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_ircode_status_t;
  };
  'IRCode.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_ircode_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'IRCode.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_ircode_config_t;
  };
  'IRCode.Emit': {
    params: {
      id: shelly_component_id_t;
      repeats?: number;
      after?: number;
    };
    result: null;
  };
};

export type shelly_ircode_webhook_event_t = 'ircode.emit' | 'ircode.receive';
