import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_eth_dhcp_client_single_result_t } from './Ethernet.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_t1s_type_t = 't1s';
export type shelly_t1s_key_t = `${shelly_t1s_type_t}:${shelly_component_id_t}`;

export type shelly_t1s_plca_role_t = 'coordinator' | 'follower' | 'manual';
export type shelly_t1s_plca_coord_state_t =
  | 'disabled'
  | 'coordinating'
  | 'stood_down';

export type shelly_t1s_status_t = {
  ip: string | null;
  ip6: string[] | null;
  dhcp_client_count?: number;
  plca: {
    active: boolean;
    role: shelly_t1s_plca_role_t;
    coord_state?: shelly_t1s_plca_coord_state_t;
  };
};

export type shelly_t1s_config_t = {
  enable: boolean;
  server_mode: boolean;
  ipv4mode?: 'dhcp' | 'static';
  ip?: string | null;
  netmask?: string | null;
  gw?: string | null;
  nameserver?: string | null;
  dhcp_start?: string;
  dhcp_end?: string;
  plca: {
    enable: boolean;
    node_id: number;
    node_count: number;
    burst_count?: number;
    burst_timer?: number;
    to_timer?: number;
    role: shelly_t1s_plca_role_t;
    reserved?: number;
  };
};

export type shelly_t1s_peer_t = {
  dev: string;
  mac: string;
  role: 'follower' | 'manual';
  state: 'unmanaged' | 'assigning' | 'configured' | 'no_slot' | 'error';
  enable: boolean;
  node_id: number;
  node_count?: number;
  to_timer?: number;
  burst_count?: number;
  burst_timer?: number;
  active: boolean;
  since: number;
  flags?: string[];
  actual?: {
    enable?: boolean;
    node_id?: number;
    node_count?: number;
    to_timer?: number;
    burst_count?: number;
    burst_timer?: number;
  };
};

export type shelly_t1s_rpc_method_map_t = {
  'T1S.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_t1s_status_t;
  };
  'T1S.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_t1s_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'T1S.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_t1s_config_t;
  };
  'T1S.ListClients': {
    params: {
      id: shelly_component_id_t;
      offset?: number;
    };
    result: {
      ts: number;
      offset: number;
      count: number;
      total: number;
      dhcp_clients: shelly_eth_dhcp_client_single_result_t[];
    } | null;
  };
  'T1S.ListPeers': {
    params: {
      id: shelly_component_id_t;
      offset?: number;
    };
    result: {
      state: shelly_t1s_plca_coord_state_t;
      uptime: number;
      offset: number;
      count: number;
      total: number;
      peers: shelly_t1s_peer_t[];
    };
  };
};
