import {
  shelly_rpc_method_params_t,
  shelly_rpc_method_t,
} from '../ShellyRpc.js';

export function canonicalize<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(item => canonicalize(item)) as T;
  } else if (obj !== null && typeof obj === 'object') {
    const sortedEntries = Object.keys(obj as Record<string, unknown>)
      .sort()
      .map(key => [key, canonicalize((obj as Record<string, unknown>)[key])]);

    return Object.fromEntries(sortedEntries) as T;
  } else {
    return obj;
  }
}

export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16);
}

export function hashRpcRequest(
  method: shelly_rpc_method_t,
  params: shelly_rpc_method_params_t<shelly_rpc_method_t>
): string {
  const canonicalParams = canonicalize(params);
  const paramString = JSON.stringify(canonicalParams);
  return hashString(`${method}:${paramString}`);
}
