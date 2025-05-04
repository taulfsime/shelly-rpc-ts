import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_em1data_status_errors_t = 'database_error' | 'ct_type_not_set';

export type shelly_em1data_config_t = {};
export type shelly_em1data_status_t = {
  id: shelly_component_id_t;
  total_act_energy: number;
  total_act_ret_energy: number;
  errors?: shelly_em1data_status_errors_t[];
};

export type shelly_em1data_rpc_method_map_t = {
  'EM1Data.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_em1data_status_t;
  };
  'EM1Data.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_em1data_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'EM1Data.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_em1data_config_t;
  };
  'EM1Data.GetRecords': {
    params: {
      id: shelly_component_id_t;
      ts: number;
    };
    result: {
      data_blocks: {
        ts: number;
        period: number;
        records: number;
      }[];
    };
  };
  'EM1Data.GetData': {
    params: {
      id: shelly_component_id_t;
      ts: number;
      end_ts: number;
      add_keys: boolean;
    };
    result: {
      keys?: [
        'total_act_energy',
        'total_act_ret_energy',
        'lag_react_energy',
        'lead_react_energy',
        'max_act_power',
        'min_act_power',
        'max_aprt_power',
        'min_aprt_power',
        'max_voltage',
        'min_voltage',
        'avg_voltage',
        'max_current',
        'min_current',
        'avg_current',
      ];
      data: {
        ts: number;
        period: number;
        values: number[][];
      }[];
      next_record_ts: number;
    };
  };
  'EM1Data.DeleteAllData': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'EM1Data.ResetCounters': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'EM1Data.GetNetEnergies': {
    params: {
      id: shelly_component_id_t;
      ts: number;
      end_ts: number;
      period: 300 | 900 | 1800 | 3600;
      add_keys: boolean;
    };
    result: {
      keys?: ['net_act_energy'];
      data: {
        ts: number;
        period: number;
        values: number[][];
      }[];
      next_record_ts: number;
    };
  };
};
