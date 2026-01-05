import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

type shelly_voltmeter_status_errors_t = 'read' | 'out_of_range';

export type shelly_voltmeter_type_t = 'voltmeter';
export type shelly_voltmeter_key_t =
  `${shelly_voltmeter_type_t}:${shelly_component_id_t}`;

export type shelly_voltmeter_status_t = {
  id: shelly_component_id_t;
  voltage: number | null;
  xvoltage: number | null;
  errors?: shelly_voltmeter_status_errors_t[];
};

export type shelly_voltmeter_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  report_thr: number;
  range: 0 | 1;
  xvoltage: {
    expr: string | null;
    unit: string | null;
  };
};

export type shelly_voltmeter_rpc_method_map_t = {
  'Voltmeter.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_voltmeter_status_t;
  };
  'Voltmeter.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_voltmeter_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Voltmeter.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_voltmeter_config_t;
  };
  'Voltmeter.CheckExpression': {
    params: {
      inputs: (null | shelly_component_id_t)[];
      expr: string;
    };
  };
};

export type shelly_voltmeter_webhook_event_t =
  | 'voltmeter.change'
  | 'voltmeter.measurement';
