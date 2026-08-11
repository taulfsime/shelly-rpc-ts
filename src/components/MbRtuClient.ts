import { shelly_component_id_t } from '../ShellyComponents.js';
import { optional_recursive_t } from './helpers.js';

export type shelly_mbrtuclient_type_t = 'mbrtuclient';
export type shelly_mbrtuclient_key_t =
  `${shelly_mbrtuclient_type_t}:${shelly_component_id_t}`;

export type shelly_mbrtuclient_config_t = {};

export type shelly_mbrtuclient_status_t = {};

type shelly_mbrtuclient_read_params_t = {
  id: shelly_component_id_t;
  sid: number;
  addr: number;
  qty: number;
};

export type shelly_mbrtuclient_rpc_method_map_t = {
  'MbRtuClient.GetConfig': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_mbrtuclient_config_t;
  };
  'MbRtuClient.SetConfig': {
    params: {
      id: shelly_component_id_t;
      config: optional_recursive_t<shelly_mbrtuclient_config_t>;
    };
    result: {
      restart_required: boolean;
    };
  };
  'MbRtuClient.GetStatus': {
    params: {
      id: shelly_component_id_t;
    };
    result: shelly_mbrtuclient_status_t;
  };
  'MbRtuClient.ReadHoldingRegisters': {
    params: shelly_mbrtuclient_read_params_t;
    result: {
      values: number[];
    };
  };
  'MbRtuClient.ReadInputRegisters': {
    params: shelly_mbrtuclient_read_params_t;
    result: {
      values: number[];
    };
  };
  'MbRtuClient.ReadDiscreteInputs': {
    params: shelly_mbrtuclient_read_params_t;
    result: {
      values: boolean[];
    };
  };
  'MbRtuClient.ReadCoils': {
    params: shelly_mbrtuclient_read_params_t;
    result: {
      values: boolean[];
    };
  };
  'MbRtuClient.WriteHoldingRegisters': {
    params: {
      id: shelly_component_id_t;
      sid: number;
      addr: number;
      values: number[];
    };
    result: null;
  };
  'MbRtuClient.WriteSingleRegister': {
    params: {
      id: shelly_component_id_t;
      sid: number;
      addr: number;
      value: number;
    };
    result: null;
  };
  'MbRtuClient.WriteCoils': {
    params: {
      id: shelly_component_id_t;
      sid: number;
      addr: number;
      values: boolean[];
    };
    result: null;
  };
};
