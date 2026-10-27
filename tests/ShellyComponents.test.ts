import { describe, it, expect, expectTypeOf } from 'vitest';
import {
  parseComponentKey,
  shelly_component_attrs_t,
  shelly_component_status_t,
} from '../src/ShellyComponents.js';
import {
  shelly_rpc_method_params_t,
  shelly_rpc_method_result_t,
} from '../src/ShellyRpc.js';
import { shelly_output_component_attrs_t } from '../src/components/common.js';

describe('parseComponentKey', () => {
  it('should return type only for single-instance keys', () => {
    expect(parseComponentKey('sys')).toEqual({ type: 'sys' });
    expect(parseComponentKey('wifi')).toEqual({ type: 'wifi' });
    expect(parseComponentKey('mqtt')).toEqual({ type: 'mqtt' });
  });

  it('should return type and id for multi-instance keys', () => {
    expect(parseComponentKey('switch:1')).toEqual({ type: 'switch', id: 1 });
    expect(parseComponentKey('boolean:200')).toEqual({
      type: 'boolean',
      id: 200,
    });
    expect(parseComponentKey('input:7')).toEqual({ type: 'input', id: 7 });
  });

  it('should parse keys with multi-digit ids', () => {
    expect(parseComponentKey('cover:1234')).toEqual({
      type: 'cover',
      id: 1234,
    });
  });

  it('should parse keys with id of 0', () => {
    expect(parseComponentKey('light:0')).toEqual({ type: 'light', id: 0 });
  });

  it('should coerce id to number', () => {
    const result = parseComponentKey('rgb:42');
    expect(result).toEqual({ type: 'rgb', id: 42 });
    expect(typeof result.id).toBe('number');
    expect(typeof result.type).toBe('string');
  });
});

describe('component and method types', () => {
  it('should parse the camera, storage, LED strip and Pro RGBWW PM keys', () => {
    expect(parseComponentKey('camera:0')).toEqual({ type: 'camera', id: 0 });
    expect(parseComponentKey('camerazone:200')).toEqual({
      type: 'camerazone',
      id: 200,
    });
    expect(parseComponentKey('storage:0')).toEqual({ type: 'storage', id: 0 });
    expect(parseComponentKey('ledstrip:0')).toEqual({
      type: 'ledstrip',
      id: 0,
    });
    expect(parseComponentKey('prorgbwwpm')).toEqual({ type: 'prorgbwwpm' });
  });

  it('should type the results as the firmware sends them', () => {
    expectTypeOf<
      shelly_rpc_method_result_t<'Schedule.List'>['jobs']
    >().toBeArray();
    expectTypeOf<
      shelly_rpc_method_result_t<'BTHomeDevice.GetKnownObjects'>['objects']
    >().toBeArray();
    expectTypeOf<
      shelly_rpc_method_result_t<'KNX.ListComponents'>['components']
    >().toBeArray();
    expectTypeOf<shelly_component_status_t<'shelr'>>().toHaveProperty('key1');
    expectTypeOf<shelly_rpc_method_params_t<'Input.Trigger'>>().toHaveProperty(
      'event_type'
    );
    expectTypeOf<shelly_rpc_method_result_t<'Uni.OneWireScan'>>().toEqualTypeOf<
      shelly_rpc_method_result_t<'SensorAddon.OneWireScan'>
    >();
    expectTypeOf<shelly_component_attrs_t<'switch'>>().toEqualTypeOf<
      shelly_output_component_attrs_t | undefined
    >();
  });
});
