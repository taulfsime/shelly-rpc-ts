import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_component_key_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_lnm_type_t = 'lnm';
export type shelly_lnm_key_t = `${shelly_lnm_type_t}:${shelly_component_id_t}`;

export type shelly_lnm_config_t = {
  id: shelly_component_id_t;
  addr: string;
  rpc_enable: boolean;
  tx: {
    enable: boolean;
    components: shelly_component_key_t[];
  };
  rx: {
    enable: boolean;
  };
};

export type shelly_lnm_status_t = {
  id: shelly_component_id_t;
  stats: {
    tx_msgs: number;
    rx_msgs: number;
    since: number;
  };
};

export type shelly_lnm_rpc_method_map_t = {
  'LNM.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_lnm_status_t;
  };
  'LNM.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_lnm_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'LNM.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_lnm_config_t;
  };
  'LNM.Create': {
    params: {
      config: {
        addr: string;
      } & Partial<Omit<shelly_lnm_config_t, 'id' | 'addr'>>;
      id?: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'LNM.Delete': {
    params: {
      id: shelly_component_id_t;
    };
    result: {};
  };
  'LNM.Call': {
    params: {
      id: shelly_component_id_t;
      method: string;
      params?: Record<string, unknown>;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
};

export type shelly_lnm_webhook_event_t = 'lnm.rx_status' | 'lnm.rx_event';
