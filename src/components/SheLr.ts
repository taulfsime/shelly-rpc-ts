import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_shelr_accept_t = 'user' | 'rpc';

export type shelly_shelr_type_t = 'shelr';
export type shelly_shelr_key_t =
  `${shelly_shelr_type_t}:${shelly_component_id_t}`;

export type shelly_shelr_config_set_t = {
  id?: shelly_component_id_t;
  name?: string | null;
  addr?: string | null;
  tx_key_id?: 1 | 2 | 3;
  key1?: string | null;
  key2?: string | null;
  key3?: string | null;
  accept?: shelly_shelr_accept_t[] | null;
};

export type shelly_shelr_config_t = {
  id: shelly_component_id_t;
  name: string | null;
  addr: string | null;
  tx_key_id: 1 | 2 | 3;
  key1: boolean;
  key2: boolean;
  key3: boolean;
  accept: shelly_shelr_accept_t[] | null;
};

export type shelly_shelr_status_t = {
  id: shelly_component_id_t;
};

type shelly_shelr_tx_key_params_t =
  | { tx_key?: string; tx_key_id?: never }
  | { tx_key?: never; tx_key_id?: 1 | 2 | 3 };

export type shelly_shelr_rpc_method_map_t = {
  'SheLr.Create': {
    params: {
      config: shelly_shelr_config_set_t;
      id?: shelly_component_id_t;
    };
    result: {
      id: shelly_component_id_t;
    };
  };
  'SheLr.Delete': {
    params: {
      id: shelly_component_id_t;
    };
    result: null;
  };
  'SheLr.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_shelr_config_t;
  };
  'SheLr.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_shelr_config_set_t;
    };
    result: {
      restart_required: boolean;
    };
  };
  'SheLr.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_shelr_status_t;
  };
  'SheLr.Send': {
    params: {
      id: shelly_component_id_t;
      lr_addr: string;
      data: string;
    } & shelly_shelr_tx_key_params_t;
    result: null;
  };
  'SheLr.Call': {
    params: {
      id: shelly_component_id_t;
      lr_addr: string;
      method: string;
      params?: Record<string, unknown>;
    } & shelly_shelr_tx_key_params_t;
    result: unknown;
  };
  'SheLr.Notify': {
    params: {
      id: shelly_component_id_t;
      lr_addr: string;
      method: string;
      params?: Record<string, unknown>;
    } & shelly_shelr_tx_key_params_t;
    result: null;
  };
  'SheLr.ResetRxCounter': {
    params: {
      id: shelly_component_id_t;
      lr_addr: string;
    };
    result: null;
  };
};

export type shelly_shelr_webhook_event_t = 'shelr.user_rx';
