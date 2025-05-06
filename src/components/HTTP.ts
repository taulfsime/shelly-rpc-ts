type shelly_http_method_post_params_base_t = {
  url: string;
  content_type?: string;
  timeout?: number;
  ssl_ca?: '*' | 'user_ca.pem' | null;
};

type shelly_http_request_params_base_t = Omit<
  shelly_http_method_post_params_base_t,
  'content_type'
> & {
  method: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE';
  headaers?: {
    'User-Agent': never;
    'Content-Length': never;
    [key: string]: string;
  };
};

type shelly_http_result_t = {
  code: number;
  message: string;
  headers: Record<string, string>;
  body: string;
  body_b64: string;
};

export type shelly_http_rpc_method_map_t = {
  'HTTP.GET': {
    params: {
      url: string;
      timeout?: number;
      ssl_ca: '*' | 'user_ca.pem' | null;
    };
    result: shelly_http_result_t;
  };
  'HTTP.POST': {
    params:
      | (shelly_http_method_post_params_base_t & {
          body: string;
          body_b64?: never;
        })
      | (shelly_http_method_post_params_base_t & {
          body?: never;
          body_b64: string;
        });
    result: shelly_http_result_t;
  };
  'HTTP.Request': {
    params:
      | (shelly_http_request_params_base_t & {
          body: string;
          body_b64?: never;
        })
      | (shelly_http_request_params_base_t & {
          body: never;
          body_b64?: string;
        });
    result: shelly_http_result_t;
  };
};
