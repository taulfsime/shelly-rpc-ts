type shelly_wifi_config_sta_static_t = {
  ipv4mode: 'static';
  ip: string | null;
  netmask: string | null;
  gw: string | null;
  nameserver: string | null;
};

type shelly_wifi_config_sta_t = {
  ssid: string | null;
  pass: string | null;
  is_open: boolean;
  enable: boolean;
  ipv4mode: 'dhcp' | 'static';
};

export type shelly_wifi_config_t = {
  ap: {
    ssid: string | null;
    pass: string | null;
    is_open: boolean;
    enable: boolean;
    range_extender?: {
      enable: boolean;
    };
  };
  sta:
    | shelly_wifi_config_sta_t
    | (shelly_wifi_config_sta_t & shelly_wifi_config_sta_static_t);
  sta1:
    | shelly_wifi_config_sta_t
    | (shelly_wifi_config_sta_t & shelly_wifi_config_sta_static_t);
  roam: {
    rssi_thr: number;
    interval: number;
  };
};

export type shelly_wifi_status_t = {
  sta_ip: string | null;
  status: 'disconnected' | 'connecting' | 'connected' | 'got ip';
  ssid: string | null;
  rssi: number;
  ap_client_count: number;
};

export type shelly_wifi_scan_result_t = {
  results: {
    ssid: string | null;
    bssid: string;
    rssi: number;
    channel: number;
    auth: 0 | 1 | 2 | 3 | 4 | 5; // https://shelly-api-docs.shelly.cloud/gen2/ComponentsAndServices/WiFi#wifiscan
  }[];
};

export type shelly_wifi_rpc_method_map_t = {
  'WiFi.GetStatus': {
    params: never;
    result: shelly_wifi_status_t;
  };
  'WiFi.GetConfig': {
    params: never;
    result: shelly_wifi_config_t;
  };
};
