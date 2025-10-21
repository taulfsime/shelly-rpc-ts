import { shelly_component_id_t } from '../ShellyComponents.js';

export type shelly_thermostat_type_t = 'thermostat';

export type shelly_thermostat_key_t =
  `${shelly_thermostat_type_t}:${shelly_component_id_t}`;

export type shelly_thermostat_thermostat_type_t = 'heating' | 'cooling';

export type shelly_thermostat_profile_t = {
  id: number;
  name: string;
};

export type shelly_thermostat_rule_t = {
  rule_id: string;
  enable: boolean;
  target_C: number;
  profile_id: number;
  timespec: string;
};

export type shelly_thermostat_status_t = {
  id: shelly_component_id_t;
  enable: boolean;
  target_C: number;
  current_C: number;
  output: boolean;
  schedules: {
    enable: boolean;
    profile_id: number;
    profile_name: string;
  };
};

export type shelly_thermostat_config_t = {
  id: shelly_component_id_t;
  enable: boolean;
  sensor: string;
  type: shelly_thermostat_thermostat_type_t;
  actuator: string;
  hysteresis: number;
  invert_output: boolean;
  display_unit: 'C' | 'F';
  target_C: number;
  name: string | null;
};

export type shelly_thermostat_rpc_method_map_t = {
  'Thermostat.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_thermostat_status_t;
  };
  'Thermostat.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_thermostat_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Thermostat.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_thermostat_config_t;
  };
  'Thermostat.Create': {
    params: {};
    result: {
      restarting_after: number;
      new_thermostat_id: shelly_component_id_t;
    };
  };
  'Thermostat.Delete': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'Thermostat.Schedule.AddProfile': {
    params: {
      id: shelly_component_id_t;
      name: string;
    };
    result: {
      restart_required: boolean;
      profile_id: number;
    };
  };
  'Thermostat.Schedule.ListProfiles': {
    params: {
      id: shelly_component_id_t;
    };
    result: {
      profiles: shelly_thermostat_profile_t[];
    };
  };
  'Thermostat.Schedule.DeleteProfile': {
    params: {
      id: shelly_component_id_t;
      profile_id: number;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Thermostat.Schedule.RenameProfile': {
    params: {
      id: shelly_component_id_t;
      profile_id: number;
      name: string;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Thermostat.Schedule.ListRules': {
    params: {
      id: shelly_component_id_t;
      profile_id: number;
    };
    result: shelly_thermostat_rule_t[];
  };
  'Thermostat.Schedule.AddRule': {
    params: {
      id: shelly_component_id_t;
      config: {
        enable: boolean;
        profile_id: number;
        target_C: number;
        timespec: string;
      };
    };
    result: {
      restart_required: boolean;
      new_rule: shelly_thermostat_rule_t;
    };
  };
  'Thermostat.Schedule.ChangeRule': {
    params: {
      id: shelly_component_id_t;
      config: shelly_thermostat_rule_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Thermostat.Schedule.DeleteRule': {
    params: {
      id: shelly_component_id_t;
      rule_id: string;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Thermostat.Schedule.SetConfig': {
    params: {
      config: {
        id: shelly_component_id_t;
        enable?: boolean;
        profile_id?: number;
      };
    };
    result: {
      restart_required: boolean;
    };
  };
};
