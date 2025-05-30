import { shelly_component_id_t } from '../ShellyComponents.js';
import { shelly_service_identifier_type_t } from './Service.js';

export type shelly_xmod_jws_t = string;

export type shelly_xmod_info = {
  aud: string;
  iat: number;
  jti: string;
  v: number;
  p: string;
  n: string;
  url: string;
  f: 0 | 1;
  m?: string;
  xt1?: {
    [K: `svc${shelly_component_id_t}`]: {
      type: shelly_service_identifier_type_t;
      ver: string;
      build_id: string;
    };
  };
  xmod1?: {
    ni: number;
    no: number;
    led: 1 | 2;
  };
};

export type shelly_xmod_rpc_method_map_t = {
  'XMOD.GetInfo': {
    params: never;
    result: shelly_xmod_info;
  };
  'XMOD.ApplyProductJWS': {
    params: {
      jws: shelly_xmod_jws_t;
    };
    result: null;
  };
  'XMOD.GetProductJWS': {
    params: never;
    result: {
      jws: shelly_xmod_jws_t;
    };
  };
};
