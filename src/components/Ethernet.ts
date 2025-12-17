export type shelly_ethernet_type_t = 'eth';
export type shelly_ethernet_key_t = shelly_ethernet_type_t;

export type shelly_ethernet_status_t = {
  ip: string | null;
  ip6: string[] | null;
};

//: TODO: more detailed type per server and ipv4 modes
export type shelly_ethernet_config_t = {
  enable: boolean;
  server_mode: boolean;
  ipv4mode: 'dhcp' | 'static';
  ip?: string | null;
  netmask?: string | null;
  gw?: string | null;
  dhcp_start?: string;
  dhcp_end?: string;
};

export type shelly_eth_dhcp_client_single_result_t = {
  host: string | null;
  mac: string;
  ip: string;
  ttl: number;
};

export type shelly_ethernet_rpc_method_map_t = {
  'Eth.GetStatus': {
    params?: {};
    result: shelly_ethernet_status_t;
  };
  'Eth.SetConfig': {
    params: {
      config: shelly_ethernet_config_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'Eth.GetConfig': {
    params?: {};
    result: shelly_ethernet_config_t;
  };
  'Eth.ListClients': {
    params: {
      offset: number;
    };
    result: {
      ts: number;
      offset: number;
      count: number;
      total: number;
      dhcp_clients: shelly_eth_dhcp_client_single_result_t[];
    };
  };
};
