type shelly_component_single_instance_t = 'sys' | 'wifi' | 'mqtt';

type shelly_component_virtual_instance_t =
  | 'number'
  | 'boolean'
  | 'text'
  | 'object'
  | 'enum'
  | 'bthomesensor'
  | 'bthomedevice'
  | 'group';

type shelly_component_multi_instance_t =
  | shelly_component_virtual_instance_t
  | 'switch'
  | 'cover'
  | 'light'
  | 'service'
  | 'script'
  | 'temperature'
  | 'humidity'
  | 'input'
  | 'pm1';

type shelly_component_key_helper<K extends shelly_component_type_t> =
  K extends shelly_component_single_instance_t
    ? K
    : `${K}:${shelly_component_id_t}`;

export type shelly_component_id_t = number;
export type shelly_component_type_t =
  | shelly_component_single_instance_t
  | shelly_component_multi_instance_t;

export type shelly_component_key_t = shelly_component_key_helper<
  shelly_component_multi_instance_t | shelly_component_single_instance_t
>;
