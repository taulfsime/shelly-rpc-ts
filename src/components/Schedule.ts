import {
  shelly_rpc_method_params_t,
  shelly_rpc_method_t,
} from '../ShellyRpc.js';

type shelly_schedule_call_t<K extends shelly_rpc_method_t> = {
  method: K;
  params: shelly_rpc_method_params_t<K>;
};

export type shelly_schedule_job_t = {
  id: number;
  enable: boolean;
  timespec: string; // cron jon!!!
  calls: shelly_schedule_call_t<any>[];
};

export type shelly_schedule_rpc_method_map_t = {
  'Schedule.Create': {
    params: Omit<shelly_schedule_job_t, 'id'>;
    result: {
      id: number;
      rev: number;
    };
  };
  'Schedule.Update': {
    params: shelly_schedule_job_t;
    result: {
      rev: number;
    };
  };
  'Schedule.List': {
    params: never;
    result: {
      job: shelly_schedule_job_t[];
      rev: number;
    };
  };
  'Schedule.Delete': {
    params: {
      id: number;
    };
    result: {
      rev: number;
    };
  };
  'Schedule.DeleteAll': {
    params: never;
    result: {
      rev: number;
    };
  };
};
