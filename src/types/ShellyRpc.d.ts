import { shelly_device_rpc_method_map_t } from './Shelly';
import { shelly_sys_rpc_method_map_t } from './Sys';

export type shelly_rpc_msg_out_t = {
  id: number;
  src: string;
  method: shelly_rpc_method_t;
  params?: Record<string, unknown>; //XXX: Change to specific types
};

type shelly_rpc_notification_event_t = {
  dst: string;
  src: string;
  method: 'NotifyEvent';
  params: {
    ts: number;
    events: {
      component: shelly_component_key_t;
      id?: shelly_component_id_t;
      event: string; //XXX: Change to specific types
      ts: number;
    }[];
  };
};

type shelly_rpc_notification_status_t = {
  dst: string;
  src: string;
  method: 'NotifyStatus';
  params: {
    ts: number;
  } & {
    [key in shelly_component_key_t]?: shelly_rpc_method_result_t<shelly_rpc_method_t>;
  };
};

export type shelly_rpc_notification_t =
  | shelly_rpc_notification_event_t
  | shelly_rpc_notification_status_t;

type shelly_component_single_instance_t = 'sys' | 'wifi' | 'mqtt';

type shelly_component_multi_instance_t =
  | 'switch'
  | 'cover'
  | 'light'
  | 'service'
  | 'number'
  | 'boolean'
  | 'text'
  | 'object'
  | 'enum'
  | 'script'
  | 'temperature'
  | 'humidity'
  | 'input'
  | 'bthomesensor'
  | 'bthomedevice'
  | 'pm1';

export type shelly_component_id_t = number;
export type shelly_component_type_t =
  | shelly_component_single_instance_t
  | shelly_component_multi_instance_t;

export type shelly_component_key_t =
  | shelly_component_single_instance_t
  | `${shelly_component_multi_instance_t}:${shelly_component_id_t}`;

type shelly_rpc_method_map_t = shelly_device_rpc_method_map_t &
  shelly_sys_rpc_method_map_t;

type shelly_rpc_method_t = keyof shelly_rpc_method_map_t;

type shelly_rpc_method_params_t<K extends shelly_rpc_method_t> =
  K extends keyof shelly_rpc_method_map_t
    ? shelly_rpc_method_map_t[K] extends { params: infer P }
      ? P
      : shelly_rpc_method_map_t[K] extends { params?: infer P }
        ? P | undefined
        : never
    : never;

export type shelly_rpc_method_result_t<K extends shelly_rpc_method_t> =
  K extends keyof shelly_rpc_method_map_t
    ? shelly_rpc_method_map_t[K]['result']
    : null;

export type shelly_rpc_request_t<K extends shelly_rpc_method_t> = {
  jsonrpc: '2.0';
  id: number;
  method: K;
} & ({} extends shelly_rpc_method_params_t<K>
  ? { params?: shelly_rpc_method_params_t<K> }
  : shelly_rpc_method_params_t<K> extends undefined | never
    ? { params?: shelly_rpc_method_params_t<K> }
    : { params: shelly_rpc_method_params_t<K> });

export type shelly_rpc_method_response_t<K extends shelly_rpc_method_t> =
  | {
      id: number;
      src: string;
      dst: string;
      result: shelly_rpc_method_result_t<K>;
    }
  | {
      id: number;
      src: string;
      dst: string;
      error: {
        code: number;
        message: string;
      };
    };
