import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_output_component_status_counter_t } from './common.js';
import { optional_recursive_t } from './helpers.js';

type shelly_bm_battery_type_t =
  | 'none'
  | 'lead-vrla'
  | 'lead-gel'
  | 'lead-start'
  | 'lifepo4'
  | 'li-ion';

type shelly_bm_probe_type_t = 'direct' | 'vt';

type shelly_bm_soc_method_t = 'matrix' | 'peukert';

type shelly_bm_config_soc_t = {
  enable: boolean;
  method: shelly_bm_soc_method_t;
  capacity_s?: number;
  current_s?: number;
  peukert?: number;
  charge_eff?: number;
  charged_voltage?: number;
  tail_current?: number;
  capacity_temp_change?: number;
  voltage_temp_change?: number;
  capacity_nom_tC?: number;
  self_discharge_month?: number;
  discharge_floor?: number;
};

type shelly_bm_config_soh_t = {
  enable: boolean;
  initial_r_mohm?: number;
  r_temp_change?: number;
  cycles_80prc?: number;
  installation_ts?: number;
  level_warning?: number;
  level_danger?: number;
};

type shelly_bm_status_battery_error_t =
  | 'overtemperature'
  | 'undertemperature'
  | 'overvoltage'
  | 'undervoltage';

type shelly_bm_status_battery_t = {
  voltage: number | null;
  tC: number | null;
  errors?: shelly_bm_status_battery_error_t[];
};

type shelly_bm_status_error_t =
  | 'pack_overvoltage'
  | 'pack_undervoltage'
  | 'pack_overcurrent'
  | 'pack_overtemp'
  | 'pack_undertemp'
  | 'discharge_warning'
  | 'soh_warning'
  | 'soh_danger'
  | 'imbalance'
  | 'batt_overtemp'
  | 'batt_undertemp'
  | 'batt_overvoltage'
  | 'batt_undervoltage';

export type shelly_bm_type_t = 'bm';
export type shelly_bm_key_t = `${shelly_bm_type_t}:${shelly_component_id_t}`;

export type shelly_bm_status_t = {
  id: shelly_component_id_t;
  voltage: number;
  current: number;
  power: number;
  energy_ch: shelly_output_component_status_counter_t;
  energy_disch: shelly_output_component_status_counter_t;
  batteries: Record<string, shelly_bm_status_battery_t>;
  soc?: number;
  remaining_time?: number;
  remaining_iavg?: number;
  soh?: number;
  resistance_mohm?: number;
  cycles?: number;
  installation_ts?: number;
  errors?: shelly_bm_status_error_t[];
};

export type shelly_bm_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  reverse: boolean;
  probe_type: shelly_bm_probe_type_t;
  type: shelly_bm_battery_type_t;
  batt_count?: number;
  batt_vnom?: number;
  capacity?: number;
  current_nom?: number;
  ilimits?: [number, number];
  batt_vlimits?: [number, number];
  batt_tlimits?: [number, number];
  batt_ballance_thr?: number;
  soc?: shelly_bm_config_soc_t;
  soh?: shelly_bm_config_soh_t;
};

export type shelly_bm_rpc_method_map_t = {
  'BM.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bm_status_t;
  };
  'BM.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_bm_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BM.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_bm_config_t;
  };
  'BM.ResetCounters': {
    params: {
      id: shelly_component_id_t;
      type?: ('aenergy' | 'ret_aenergy')[];
    };
    result: {
      aenergy: {
        total: number;
      };
      ret_aenergy: {
        total: number;
      };
    };
  };
  'BM.ResetCharge': {
    params: {
      id: shelly_component_id_t;
      soc?: number;
    };
    result: {
      restart_required: boolean;
    };
  };
  'BM.ReplaceBattery': {
    params: {
      id: shelly_component_id_t;
      cycles?: number;
    };
    result: {
      restart_required: boolean;
    };
  };
};

export type shelly_bm_webhook_event_t =
  | 'bm.pack_voltage_change'
  | 'bm.pack_temp_change'
  | 'bm.pack_current_change'
  | 'bm.alarm_pack_overvoltage'
  | 'bm.alarm_pack_overvoltage_clear'
  | 'bm.alarm_pack_undervoltage'
  | 'bm.alarm_pack_undervoltage_clear'
  | 'bm.alarm_pack_charge_current'
  | 'bm.alarm_pack_charge_current_clear'
  | 'bm.alarm_pack_discharge_current'
  | 'bm.alarm_pack_discharge_current_clear'
  | 'bm.alarm_pack_overtemperature'
  | 'bm.alarm_pack_overtemperature_clear'
  | 'bm.alarm_pack_undertemperature'
  | 'bm.alarm_pack_undertemperature_clear'
  | 'bm.alarm_pack_soc_warning'
  | 'bm.alarm_pack_soc_warning_clear'
  | 'bm.alarm_pack_imbalance'
  | 'bm.alarm_pack_imbalance_clear';
