import {
  shelly_rpc_method_params_t,
  shelly_rpc_method_t,
} from '../ShellyRpc.js';

type shelly_schedule_call_t<K extends shelly_rpc_method_t> = {
  method: K;
  params: shelly_rpc_method_params_t<K>;
};

type shelly_schedule_id_t = number;
export type shelly_schedule_rev_t = number;

export type shelly_schedule_job_t = {
  id: shelly_schedule_id_t;
  enable: boolean;
  timespec: string; // cron jon!!!
  calls: shelly_schedule_call_t<any>[];
};

export type shelly_schedule_rpc_method_map_t = {
  'Schedule.Create': {
    params: Omit<shelly_schedule_job_t, 'id'>;
    result: {
      id: shelly_schedule_id_t;
      rev: shelly_schedule_rev_t;
    };
  };
  'Schedule.Update': {
    params: shelly_schedule_job_t;
    result: {
      rev: shelly_schedule_rev_t;
    };
  };
  'Schedule.List': {
    params: never;
    result: {
      job: shelly_schedule_job_t[];
      rev: shelly_schedule_rev_t;
    };
  };
  'Schedule.Delete': {
    params: {
      id: shelly_schedule_id_t;
    };
    result: {
      rev: shelly_schedule_rev_t;
    };
  };
  'Schedule.DeleteAll': {
    params: never;
    result: {
      rev: shelly_schedule_rev_t;
    };
  };
};
