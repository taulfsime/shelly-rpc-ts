import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_blutrv_webhook_event_t } from './BluTrv.js';
import { shelly_bthomedevice_webhook_event_t } from './BTHomeComponents/BTHomeDevice.js';
import { shelly_bthomesensor_webhook_event_t } from './BTHomeComponents/BTHomeSensor.js';
import { shelly_cct_webhook_event_t } from './CCT.js';
import { shelly_cover_webhook_event_t } from './Cover.js';
import { shelly_em_webhook_event_t } from './EM.js';
import { shelly_em1_webhook_event_t } from './EM1.js';
import { shelly_humidity_webhook_event_t } from './Humidity.js';
import { shelly_input_webhook_event_t } from './Input.js';
import { shelly_light_webhook_event_t } from './Light.js';
import { shelly_pm1_webhook_event_t } from './PM1.js';
import { shelly_rgb_webhook_event_t } from './RGB.js';
import { shelly_rgbw_webhook_event_t } from './RGBW.js';
import { shelly_smoke_webhook_event_t } from './Smoke.js';
import { shelly_switch_webhook_event_t } from './Switch.js';
import { shelly_temperature_webhook_event_t } from './Temperature.js';
import { shelly_boolean_webhook_event_t } from './VirtualComponents/Boolean.js';
import { shelly_button_webhook_event_t } from './VirtualComponents/Button.js';
import { shelly_enum_webhook_event_t } from './VirtualComponents/Enum.js';
import { shelly_number_webhook_event_t } from './VirtualComponents/Number.js';
import { shelly_text_webhook_event_t } from './VirtualComponents/Text.js';
import { shelly_voltmeter_webhook_event_t } from './Voltmeter.js';

export type shelly_webhook_event_t =
  | shelly_bthomedevice_webhook_event_t
  | shelly_bthomesensor_webhook_event_t
  | shelly_cct_webhook_event_t
  | shelly_cover_webhook_event_t
  | shelly_em_webhook_event_t
  | shelly_em1_webhook_event_t
  | shelly_humidity_webhook_event_t
  | shelly_input_webhook_event_t
  | shelly_light_webhook_event_t
  | shelly_pm1_webhook_event_t
  | shelly_rgb_webhook_event_t
  | shelly_rgbw_webhook_event_t
  | shelly_smoke_webhook_event_t
  | shelly_switch_webhook_event_t
  | shelly_temperature_webhook_event_t
  | shelly_boolean_webhook_event_t
  | shelly_button_webhook_event_t
  | shelly_enum_webhook_event_t
  | shelly_number_webhook_event_t
  | shelly_text_webhook_event_t
  | shelly_voltmeter_webhook_event_t
  | shelly_blutrv_webhook_event_t;

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
