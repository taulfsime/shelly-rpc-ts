type shelly_kvs_key_t = string;
type shelly_kvs_value_t =
  | number
  | string
  | boolean
  | null
  | Record<string, unknown>;
type shelly_kvs_etag_t = string;

export type shelly_kvs_rev_t = number;

export type shelly_kvs_rpc_method_map_t = {
  'KVS.Set': {
    params: {
      key: shelly_kvs_key_t;
      value: shelly_kvs_value_t;
      etag?: shelly_kvs_etag_t;
    };
    result: {
      etag: shelly_kvs_etag_t;
      rev: shelly_kvs_rev_t;
    };
  };
  'KVS.Get': {
    params: {
      key: shelly_kvs_key_t;
    };
    result: {
      value: shelly_kvs_value_t;
      etag: shelly_kvs_etag_t;
    };
  };
  'KVS.List': {
    params: {
      match: string;
    };
    result: {
      keys: Record<
        shelly_kvs_key_t,
        {
          etag: shelly_kvs_etag_t;
        }
      >;
      rev: shelly_kvs_rev_t;
    };
  };
  'KVS.Delete': {
    params: {
      key: shelly_kvs_key_t;
      etag?: shelly_kvs_etag_t;
    };
    result: {
      rev: shelly_kvs_rev_t;
    };
  };
  'KVS.GetMany': {
    params: {
      match: string;
      offset: number;
    };
    result: {
      items: {
        key: shelly_kvs_key_t;
        value: shelly_kvs_value_t;
        etag: shelly_kvs_etag_t;
      }[];
      offset: number;
      total: number;
    };
  };
};
