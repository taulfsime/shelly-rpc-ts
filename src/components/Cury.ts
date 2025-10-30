import { shelly_component_id_t } from '../ShellyComponents.js';

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

type initial_state_t = 'restore_last' | 'off' | 'on';

type auto_t = {
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
};

type vial_type_t = 'perfume' | 'repellent';

type shelly_cury_status_errors_t =
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

export type shelly_cury_status_t = {
  id: shelly_component_id_t;
  slots: {
    left: {
      intensity: number;
      on: boolean;
      boost: number | null;
      timer: number | null;
      vial: {
        level: number;
        serial: string;
        name: string;
        vial_fault?: shelly_cury_vial_fault_t;
      };
    } | null;
    right: {
      intensity: number;
      on: boolean;
      boost: number | null;
      timer: number | null;
      vial: {
        level: number;
        serial: string;
        name: string;
        vial_fault?: shelly_cury_vial_fault_t;
      };
    } | null;
    mode: shelly_cury_mode_t;
    away_mode: boolean;
    errors?: shelly_cury_status_errors_t[];
  };
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
    left: initial_state_t;
    right: initial_state_t;
  };
  timer: {
    left: auto_t;
    right: auto_t;
  };
  auto_heating_on: boolean;
};

export type shelly_cury_vial_info_t = {
  id: shelly_component_id_t;
  left: {
    type: vial_type_t;
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
  } | null;
  right: {
    type: vial_type_t;
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
  } | null;
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
      config: shelly_cury_config_t;
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
      slot: 'left' | 'right';
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
      slot: 'left' | 'right';
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
      slot: 'left' | 'right';
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
