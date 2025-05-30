import { shelly_component_id_t } from '../ShellyComponents.js';
import {
  shelly_device_update_info_t,
  shelly_device_update_stage_t,
} from './Shelly.js';

type shelly_lora_status_flags_t = 'duty_cycle_limit';
type shelly_lora_status_errors_t =
  | 'ota_update_failed'
  | 'addon_update_required'
  | 'limit_reached';

export type shelly_lora_type_t = 'lora';
export type shelly_lora_key_t =
  `${shelly_lora_type_t}:${shelly_component_id_t}`;

export type shelly_lora_config_t = {
  id: shelly_component_id_t;
  freq: number;
  bw: number;
  dr: 7 | 8 | 9 | 10 | 11 | 12;
  cr: 5 | 6 | 7 | 8;
  plen: number;
  txp: number;
  rx_enable: boolean;
};

export type shelly_lora_status_t = {
  id: shelly_component_id_t;
  bytes_sent: number;
  bytes_recd: number;
  air_time_hr_ms: number;
  send_fails: number;
  fw_version: string;
  available_updates: Partial<
    Record<
      shelly_device_update_stage_t,
      Pick<shelly_device_update_info_t, 'version'>
    >
  >;
  update?: {
    progress: number;
    state: 'started' | 'updating' | 'success' | 'error';
    ts: number;
  };
  flags?: shelly_lora_status_flags_t[];
  errors?: shelly_lora_status_errors_t[];
};

export type shelly_lora_rpc_method_map_t = {
  'Lora.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_lora_status_t;
  };
  'Lora.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: shelly_lora_config_t;
    };
  };
  'Lora.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_lora_config_t;
  };
  'Lora.SendBytes': {
    params: {
      id: shelly_component_id_t;
      data: string;
    };
    result: null;
  };
};
