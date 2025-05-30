import { shelly_lora_addon_config_type_t } from './LoRa.js';
import {
  shelly_device_update_info_t,
  shelly_device_update_stage_t,
} from './Shelly.js';

export type shelly_uart_addon_types_t = shelly_lora_addon_config_type_t;

export type shelly_uart_addon_info_t = {
  type: shelly_uart_addon_types_t;
  hw_ver?: string;
  fw_ver?: string;
};

export type shelly_uart_addon_rpc_method_map_t = {
  'AddOn.GetInfo': {
    params: never;
    result: shelly_uart_addon_info_t;
  };
  'AddOn.CheckForUpdate': {
    params: never;
    result: {
      type: shelly_uart_addon_types_t;
    } & Partial<
      Record<
        shelly_device_update_stage_t,
        Pick<shelly_device_update_info_t, 'version'>
      >
    >;
  };
  'AddOn.Update': {
    params: {
      timeout?: number;
      url?: string;
    };
    result: null;
  };
};
