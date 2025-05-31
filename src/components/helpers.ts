
/**
 * Utility type that enforces only one property of the given object type T is present

 */
export type only_one_prop_t<T> = {
  [K in keyof T]: Required<Pick<T, K>> & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];
