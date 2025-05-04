import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_voltmeter_status_errors_t = 'read' | 'out_of_range';

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
      config: shelly_voltmeter_config_t;
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
