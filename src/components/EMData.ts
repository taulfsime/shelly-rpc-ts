import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_emdata_status_errors_t = 'database_error' | 'ct_type_not_set';

export type shelly_emdata_status_t = {
  id: shelly_component_id_t;
  a_total_act_energy: number;
  a_total_act_ret_energy: number;

  b_total_act_energy: number;
  b_total_act_ret_energy: number;

  c_total_act_energy: number;
  c_total_act_ret_energy: number;

  total_act: number;
  total_act_ret: number;

  errors?: shelly_emdata_status_errors_t[];
};

export type shelly_emdata_config_t = {};

export type shelly_emdata_rpc_method_map_t = {
  'EMData.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_emdata_status_t;
  };
  'EMData.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_emdata_config_t;
    };
  };
  'EMData.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_emdata_config_t;
  };
  'EMData.GetRecords': {
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
  'EMData.GetData': {
    params: {
      id: shelly_component_id_t;
      ts: number;
      end_ts: number;
      add_key: boolean;
    };
    result: {
      keys?: [
        'a_total_act_energy',
        'a_fund_act_energy',
        'a_total_act_ret_energy',
        'a_fund_act_ret_energy',
        'a_lag_react_energy',
        'a_lead_react_energy',
        'a_max_act_power',
        'a_min_act_power',
        'a_max_aprt_power',
        'a_min_aprt_power',
        'a_max_voltage',
        'a_min_voltage',
        'a_avg_voltage',
        'a_max_current',
        'a_min_current',
        'a_avg_current',
        'b_total_act_energy',
        'b_fund_act_energy',
        'b_total_act_ret_energy',
        'b_fund_act_ret_energy',
        'b_lag_react_energy',
        'b_lead_react_energy',
        'b_max_act_power',
        'b_min_act_power',
        'b_max_aprt_power',
        'b_min_aprt_power',
        'b_max_voltage',
        'b_min_voltage',
        'b_avg_voltage',
        'b_max_current',
        'b_min_current',
        'b_avg_current',
        'c_total_act_energy',
        'c_fund_act_energy',
        'c_total_act_ret_energy',
        'c_fund_act_ret_energy',
        'c_lag_react_energy',
        'c_lead_react_energy',
        'c_max_act_power',
        'c_min_act_power',
        'c_max_aprt_power',
        'c_min_aprt_power',
        'c_max_voltage',
        'c_min_voltage',
        'c_avg_voltage',
        'c_max_current',
        'c_min_current',
        'c_avg_current',
        'n_max_current',
        'n_min_current',
        'n_avg_current',
      ];
      data: {
        ts: number;
        period: number;
        values: number[][];
      }[];
      next_record_ts: number;
    };
  };
  'EMData.DeleteAllData': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'EMData.ResetCounters': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'EMData.GetNetEnergies': {
    params: {
      id: shelly_component_id_t;
      ts: number;
      end_ts: number;
      period: 300 | 900 | 1800 | 3600;
      add_keys: boolean;
    };
    result: {
      keys?: ['a_net_act_energy', 'b_net_act_energy', 'c_net_act_energy'];
      data: {
        ts: number;
        period: number;
        values: number[][];
      }[];
      next_record_ts: number;
    };
  };
};
