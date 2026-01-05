import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_cury_type_t = 'cury';

export type shelly_cury_key_t =
  `${shelly_cury_type_t}:${shelly_component_id_t}`;

export type shelly_cury_vial_fault_t =
  | 'non_genuine'
  | 'tag_error'
  | 'expired'
  | 'empty';

export type shelly_cury_mode_t =
  | 'bedroom'
  | 'living_room'
  | 'lavatory_room'
  | 'reception'
  | 'hall'
  | 'workplace'
  | null;

export type shelly_cury_inactive_state_t = 'off' | 'level' | 'intensity';

export type shelly_cury_initial_state_t = 'restore_last' | 'off' | 'on';

export type shelly_cury_auto_t = {
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
};

export type shelly_cury_vial_type_t = 'perfume' | 'repellent';

export type shelly_cury_status_errors_t =
  | 'nfc_bus'
  | 'acc_bus'
  | 'keyboard_button_stuck'
  | 'keyboard_general_error'
  | 'input_voltage_out_of_range'
  | 'thermal_sensor_connection'
  | 'thermal_sensor_driver'
  | 'heater_disconnected'
  | 'heater_overload'
  | 'input_voltage_change'
  | 'orientation_tilt'
  | 'orientation_plug_rotated';

export type shelly_cury_slot_t = 'left' | 'right';

export type shelly_cury_slot_content_t =
  | {
      type: shelly_cury_vial_type_t;
      product_name: string;
      mfr_name: string;
      exp_date: string;
      default_intensity: number;
      serial: string;
      color_intensity: {
        brightness: number;
        rgb: [number, number, number];
      };
      color_level: {
        brightness: number;
        rgb: [number, number, number];
      };
    }
  | null
  | 'none';

export type shelly_cury_slot_info_t = {
  isActive?: boolean;
  name?: string;
  color?: string;
  additional?: string[];
  slot?: shelly_cury_slot_t;
  manufacturerName?: string;
  type?: shelly_cury_vial_type_t;
  rgb?: [number, number, number] | number[];
  intensity?: number;
  level?: number;
  on?: boolean;
  isEmpty?: boolean;
};

export type shelly_cury_slot_status_t = {
  intensity: number;
  on: boolean;
  boost: { duration: number; started_at: number } | null;
  timer: { timer_started_at: number; timer_duration: number } | null;
  vial: {
    level: number;
    serial: string;
    name: string;
    vial_fault?: shelly_cury_vial_fault_t;
  };
} | null;

export type shelly_cury_status_t = {
  id: shelly_component_id_t;
  slots: {
    [key in shelly_cury_slot_t]: shelly_cury_slot_status_t;
  };
  mode: shelly_cury_mode_t;
  away_mode: boolean;
  errors?: shelly_cury_status_errors_t[];
};

export type shelly_cury_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  boost_time: number;
  ui: {
    mode: shelly_cury_inactive_state_t;
    brightness: number;
  };
  ambient: {
    enable: boolean;
    use_vial_color: boolean;
    color: [number, number, number];
    brightness: number;
  };
  initial_state: {
    [key in shelly_cury_slot_t]: shelly_cury_initial_state_t;
  };
  timer: {
    [key in shelly_cury_slot_t]: shelly_cury_auto_t;
  };
  auto_heating_on: boolean;
};

export type shelly_cury_vial_info_t = {
  [key in shelly_cury_slot_t]: shelly_cury_slot_content_t;
} & {
  id: shelly_component_id_t;
};

export type shelly_cury_rpc_method_map_t = {
  'Cury.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cury_status_t;
  };
  'Cury.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_cury_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Cury.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cury_config_t;
  };
  'Cury.Set': {
    params: {
      id: shelly_component_id_t;
      slot: shelly_cury_slot_t;
      intensity?: number;
      on?: boolean;
    };
    result: null;
  };
  'Cury.SetAwayMode': {
    params: {
      id: shelly_component_id_t;
      on: boolean;
    };
    result: null;
  };
  'Cury.Boost': {
    params: {
      id: shelly_component_id_t;
      slot: shelly_cury_slot_t;
    };
    result: {
      boost: {
        started_at: number;
        duration: number;
      };
    };
  };
  'Cury.StopBoost': {
    params: {
      id: shelly_component_id_t;
      slot: shelly_cury_slot_t;
    };
    result: {
      was_on: boolean;
    };
  };
  'Cury.GetVialInfo': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_cury_vial_info_t;
  };
  'Cury.SetMode': {
    params: {
      id: shelly_component_id_t;
      mode: shelly_cury_mode_t;
    };
    result: null;
  };
};
