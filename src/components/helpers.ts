/**
 * Utility type that enforces only one property of the given object type T is present
 *
 * Example:
 *   type A = only_one_prop_t<{ foo: number; bar: string }>;
 *   // A is: { foo: number; bar?: never } | { foo?: never; bar: string }
 *
 *   // Usage:
 *   const a: A = { foo: 1 }; // OK
 *   const b: A = { bar: 'hi' }; // OK
 *   const c: A = { foo: 1, bar: 'hi' }; // Error: only one allowed
 */
export type only_one_prop_t<T> = {
  [K in keyof T]: Required<Pick<T, K>> & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];

/**
 * Utility type that enforces at least one property of the given object type T is present
 *
 * Example:
 *   type B = at_least_one_prop_t<{ foo?: number; bar?: string }>;
 *   // B is: { foo: number; bar?: string } | { foo?: number; bar: string }
 *
 *   // Usage:
 *   const a: B = { foo: 1 }; // OK
 *   const b: B = { bar: 'hi' }; // OK
 *   const c: B = { foo: 1, bar: 'hi' }; // OK
 *   const d: B = {}; // Error: at least one required
 */
export type at_least_one_prop_t<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];
