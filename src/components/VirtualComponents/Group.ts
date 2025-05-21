import { shelly_component_id_t } from '../../ShellyComponents.js';
import { shelly_virtual_component_status_source_t } from '../Virtual.js';
import { shelly_virtual_component_key_t } from '../Virtual.js';

export type shelly_group_type_t = 'group';
export type shelly_group_key_t =
  `${shelly_group_type_t}:${shelly_component_id_t}`;

export type shelly_group_status_t = {
  source: shelly_virtual_component_status_source_t;
  value: shelly_virtual_component_key_t[];
  last_updated_ts: number;
};

export type shelly_group_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  meta: null | Record<string, unknown>;
};

export type shelly_group_rpc_method_map_t = {
  'Group.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_group_status_t;
  };
  'Group.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_group_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Group.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_group_config_t;
  };
  'Group.Set': {
    params: {
      id: shelly_component_id_t;
      value: shelly_virtual_component_key_t[];
    };
    result: null;
  };
};
