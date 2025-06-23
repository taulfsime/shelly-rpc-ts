import { shelly_component_id_t } from '../ShellyComponents.js';

type shelly_webhook_event_t = string; //XXX:

type shelly_webhook_hook_id_t = number;
export type shelly_webhook_rev_t = number;

export type shelly_webhook_hook_t = {
  id: shelly_webhook_hook_id_t;
  event: shelly_webhook_event_t;
  cid: shelly_component_id_t;
  enable: boolean;
  name: string | null;
  ssl_ca: null | '*' | 'user_ca.pem';
  urls: string[];
  active_between: [string, string] | null;
  condition: string | null;
  repeat_period: number;
};

export type shelly_webhook_rpc_method_map_t = {
  'Webhook.List': {
    params?: {};
    result: {
      hooks: shelly_webhook_hook_t[];
      rev: shelly_webhook_rev_t;
    };
  };
  'Webhook.Create': {
    params: Omit<shelly_component_id_t, 'id'>;
    result: {
      id: shelly_webhook_hook_id_t;
      rev: shelly_webhook_rev_t;
    };
  };
  'Webhook.Update': {
    params: shelly_webhook_hook_t;
    result: {
      rev: shelly_webhook_rev_t;
    };
  };
  'Webhook.Delete': {
    params: {
      id: shelly_webhook_hook_id_t;
    };
    result: {
      rev: shelly_webhook_rev_t;
    };
  };
  'Webhook.DeleteAll': {
    params?: {};
    result: {
      rev: shelly_webhook_rev_t;
    };
  };
  'Webhook.ListSupported': {
    params?: {};
    result: {
      types: Record<
        shelly_webhook_event_t,
        {
          attrs?: {
            name: string;
            type: 'number' | 'boolean' | 'string';
            desc: string;
          }[];
        }
      >;
    };
  };
};
