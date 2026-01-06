# Changelog

[0.7.1] 2026-01-06

Fixed

- Use correct ReturnType<typeof setTimeout> for timeout ID types

[0.7.0] 2026-01-05

Fixed

- RPC auth response validation no longer requires 'nc' field from server

Changed

- SetConfig RPC methods now accept partial configuration objects instead of requiring complete config

[0.6.2] 2025-12-22

Changed

- Updated dependencies
- Media: Updated status structure and added ALERT media type support

Added

- Exposed single client types for AP, Ethernet and BLE components
- Media: Added PlayAlert method for playing alert sounds

[0.6.1] 2025-12-07

Added

- Shelly.Ping RPC method support

Changed

- Updated npm publishing to use trusted publishers with provenance

[0.6.0] 2025-12-07

Added

- Transport: Debug logging support with log levels and event handling

Changed

- Cury: Updated status type structure and slot content definitions

[0.5.2] 2025-11-25

Fixed

- ShellyTransportBase: Message counting on timeout - requests now properly decrement message counter when timing out

[0.5.1] 2025-11-18

Changed

- ShellyTransportBase: Made clientId property public

Fixed

- ShellyTransportBase: Prevent unnecessary state change notifications when state hasn't changed

[0.5.0] 2025-11-17

Fixed

- ShellyTransportBase: Fixed failing tests after removing ready promise

Added

- Cury component: Added complete type definitions and RPC methods
- Thermostat component: Added complete type definitions and RPC methods
- Media component: Added complete type definitions and RPC methods
- Webhook events: Added type definitions for all component webhook events
- ShellyTransportBase: Added listener support for system events and connection state management

Changed

- ShellyTransportBase: Allow custom object comparison function (BREAKING CHANGE)
- Dependencies: Updated TypeScript to 5.9.3 and Vitest to 4.0.10
- Version bumped to 0.5.0

[0.4.2] 2025-10-28

Fixed

- ShellyTransportBase: Made handleQueue method properly private

Added

- CI: Added automatic deployment to npm registry on main branch

[0.4.1] 2025-10-28

Fixed

- Transport: Made \_onSend method protected in base transport class
- Virtual components: Added missing object component to virtual component keys union

Added

- Exports: Added missing sys component types and component attrs type to public API

[0.4.0] 2025-10-13

Added

- Support for component attributes (attrs) in transport base
- Attributes support for virtual components (number, boolean, text, object, enum) with role and owner fields
- Attributes support for BTHomeDevice components with flags and model_id fields

Changed

- Transport: Moved requests in flight limit from hardcoded constant to configurable option in constructor

[0.3.3] 2025-09-12

Changed

- Component types are now tightly coupled to their corresponding keys for better type safety

[0.3.2] 2025-08-29

Added

- ShellyTransportBase: Constructor now accepts default RPC options for timeout and numberOfRetries

[0.3.1] 2025-08-20

Fixed

- Auth response type: nonce field can now be a string

Added

- Hash utility functions for objects and RPC requests

Changed

- Transport: Store request parameters in internal request storage

[0.3.0] 2025-08-01

Added

- Authentication support for RPC requests with digest auth
- Helper functions to verify RPC errors and auth responses

[0.2.1] 2025-08-01

Added

- Request deduplication and debouncing mechanisms to base transport
- Deep equality comparison utility function
- Shelly device profile type export

Changed

- BTHome AddDevice method config parameter is now optional

[0.2.0] 2025-07-02

Added

- BTHomeControl: RPC methods for learning, listing, and managing BTHome device controls
- Matter: FactoryReset RPC method
- Service: Exposed XMOD info type in public API

[0.1.0] 2025-06-23

Fixed

- HTTP component: Made request body parameter optional
- Light/RGB/CCT components: Set methods now properly require at least one of on/brightness parameters
- Transport: Clear message timeout when max retries are reached
- Transport: Pass correct parameter types to status/event listeners

Changed

- RPC methods: Replaced params: never with params?: {} for methods without parameters
- Transport: Made RPC request method options parameter optional

[0.0.6] 2025-06-01

Added

- Transport base class with timeout and retry mechanism for RPC requests
- Method to unsubscribe notification listeners in transport base class
- Service role type for better typing of virtual component roles
- Strict config types when creating virtual components per component type
- Initial documentation and usage examples

Fixed

- Cover component RPC types to properly enforce pos/slat position parameters

[0.0.5] 2025-05-31

Added

- XMOD component types and RPC methods
- LoRa component types and RPC methods
- SensorAddon RPC methods for managing DS18B20, DHT22, digital/analog inputs, and voltmeter peripherals
- ProOutputAddon RPC methods for managing digital output peripherals
- UartAddon RPC methods for addon info, updates, and checks
- Addon config types for all supported addon components

[0.0.4] 2025-05-27

Added

- New component types: BluGw, BluTrv, UI, PlusRGBW, WD_UI, HT_UI, PlugUK_UI, PlugS_UI
- ShellyTransportBase abstract class for RPC transport implementations
- Additional output component status sources (matter, modbus, night_mode, etc.)
- Channel order field (ch) to Sys component status

Fixed

- Replaced all 'any' types with proper type constraints
- Improved RPC response/notification type predicates with proper type guards

[0.0.3] 2025-05-22

Fixed

- Virtual component key type and moved virtual RPC status source to virtual component

Added

- Component key types and type definitions exported from package
- Notification event and status types exported from ShellyRpc

[0.0.2] 2025-05-20

Fixed

- Ethernet: Corrected RPC method namespace from 'Ethernet._' to 'Eth._'
- EM1: Corrected status error and flag types, fixed calibration type
- Virtual components: Corrected type usage and component key references
- BTHome: Return correct key types in add device/sensor methods and own objects
- Shelly.GetComponents: Fixed response type mapping for component status and config

Added

- Component types: Added strict typing for component type and key mappings
- Component parsing: Added parseComponentKey function to split component key into type and ID
- Component mapping: Added comprehensive component info map for status and config types
- RGB/RGBW components: Added complete type definitions and RPC methods
- HTTP component: Added HTTP request method types (GET, POST, Request)
- RPC notifications: Added notification method types and improved type safety
- Output component: Added 'short_push' as valid status source for power strip buttons
- EM, EM1, and EMData component types with full RPC method support
- EM1Data component types with energy data management methods
- Schedule service types for cron job management
- Webhook service types for event hook management
- KVS (Key-Value Store) service types for data storage
- KNX component types with support for switch, light, cover, and input configurations
- Virtual component management with centralized Virtual.Add and Virtual.Delete methods
- BTHome component types for Bluetooth device and sensor management
- Component type definitions for Ethernet, BLE, Cloud, WebSocket, Matter, Modbus, Voltmeter, Smoke, DALI, CCT, and Zigbee components
- Component type definitions for PM1, DevicePower, and virtual Object components
- Status and configuration mapping types for all Shelly components
- RPC notification types and validation functions for NotifyStatus, NotifyFullStatus, and NotifyEvent
- Complete RPC method definitions for all component types

Changed

- Reorganized virtual components into VirtualComponents folder
- Reorganized BTHome components into BTHomeComponents folder
- Updated component type definitions to use specific revision and ID types
- Renamed package from shelly-rpc-types to shelly-rpc-ts
- Reorganized component types into separate ShellyComponents module
- Moved Shelly device types to components directory structure

[0.0.1] 2025-05-04

Added

- Virtual component types: Boolean, Text, Enum, Button, Group
- Script component types with code management and execution methods
- Sensor component types: Temperature, Humidity, Input
- BTHome component types: BTHomeSensor and BTHomeDevice
- Shelly.InstallAlt RPC method for alternative firmware installation
- isRpcResponse utility function for response type validation
- Test suite with Vitest and CI integration
- Virtual number component types with status, config, and RPC method definitions
- Service component types with status monitoring and configuration methods
- Light component types with brightness control, transitions, and calibration support
- Cover component types with position control, obstruction detection, and safety features
- Switch component types with power monitoring and energy counters
- MQTT component types with connection status and configuration
- WiFi component types with scanning, client management, and configuration
- Common output component types for shared status and counter definitions
- Complete RPC type system with request/response validation
- Message listener system for handling WebSocket events
- Shelly RPC wrapper with request/response handling and notification support
