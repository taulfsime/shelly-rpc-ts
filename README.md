# shelly-rpc-ts

TypeScript type definitions and helper utilities for the Shelly Gen2+ RPC interface.

## Features

- **Comprehensive Type Definitions:**  
  Covers all Shelly RPC methods, component configurations, statuses, and keys for Gen2+ devices.
- **Component Models:**  
  Includes types for all standard Shelly components (Switch, Cover, Light, Input, EM, MQTT, etc.), virtual components, and add-ons.
- **Extensible:**  
  Designed for easy extension as new Shelly components and RPC methods are released.
- **Helper Types and Utilities:**  
  Includes helpers for working with Shelly RPC requests, responses, and notifications.

## Installation

```sh
npm install @taulfsime/shelly-rpc-ts
```

## Usage

```typescript
import {
  shelly_switch_config_t,
  shelly_switch_status_t,
  shelly_rpc_method_t,
  shelly_rpc_method_params_t,
  shelly_rpc_method_result_t,
} from '@taulfsime/shelly-rpc-ts';

function handleSwitchStatus(status: shelly_switch_status_t) {
  // Use strongly-typed status fields
  console.log(status.id, status.output);
}
```
