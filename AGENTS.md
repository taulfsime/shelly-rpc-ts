# AGENTS.md

Guidelines for AI agents working in this repository.

## Project Overview

TypeScript type definition and utility library for the Shelly Gen2+ RPC interface, published as `@taulfsime/shelly-rpc-ts`. ESM-only, zero runtime dependencies. Source in `src/`, tests in `tests/`, dev tooling in `tools/`.

## Build / Lint / Test Commands

```bash
npm run build            # rm -rf dist && tsc — compile src/ to dist/
npm run types:check      # tsc --noEmit — type-check without emitting
npm run format:check     # prettier . --check
npm run format           # prettier . --write --list-different
npm run tests            # vitest run — run all tests
```

### Running a Single Test

```bash
npx vitest run tests/ShellyRpc.test.ts              # single file
npx vitest run tests/ShellyRpc.test.ts -t "test name" # single test by name
```

Test files live in `tests/` and follow the pattern `{Module}.test.ts`. Tests import from `../src/...` (source, not built output).

### CI Checks (all must pass)

1. `npm run format:check` — Prettier formatting
2. `npm run types:check` — TypeScript strict type checking
3. `npm run tests` — Vitest

## Code Style

### Formatting (Prettier)

- Single quotes, semicolons required
- 2-space indentation (spaces, not tabs), LF line endings
- ES5 trailing commas
- No parens around single arrow function arguments (`arrowParens: "avoid"`)
- No ESLint or other linter — Prettier is the only formatter

### Module System

- ESM only (`"type": "module"` in package.json, `"module": "NodeNext"` in tsconfig)
- All import paths use `.js` extensions, even for `.ts` source files:
  ```typescript
  import { shelly_component_id_t } from '../ShellyComponents.js';
  ```
- Relative paths only — no path aliases
- Named exports exclusively — no default exports in `src/`
- No barrel `index.ts` in subdirectories; the single `src/index.ts` is the package entry point and selectively re-exports public types (internal types like `*_rpc_method_map_t` are not re-exported)

### Imports

- Regular `import` statements — do NOT use `import type` (the project does not use `verbatimModuleSyntax`)
- Group imports: external packages first, then relative imports
- Use named imports, never default imports

### Type Conventions

- Use `type` aliases, not `interface` (interfaces are not used in `src/`)
- **snake_case with `_t` suffix** for all type names:
  ```typescript
  export type shelly_switch_status_t = { ... };
  export type shelly_switch_config_t = { ... };
  ```
- No `enum` keyword — use string literal unions for string enums and `as const` objects for numeric enums:

  ```typescript
  // String enums → union types
  type shelly_cover_state_t = 'open' | 'closed' | 'stopped' | 'calibrating';

  // Numeric enums → as const objects
  export const ShellyDebugLogLevel = { ERROR: 0, WARN: 1, INFO: 2 } as const;
  ```

- Use `null` (not `undefined`) for "no value" in domain types: `name: string | null`
- Advanced type patterns used: template literal types, conditional types, mapped types, utility types from `helpers.ts` (`only_one_prop_t`, `at_least_one_prop_t`, `optional_recursive_t`)

### Naming Conventions

| Element              | Convention          | Example                              |
| -------------------- | ------------------- | ------------------------------------ |
| Type aliases         | `snake_case_t`      | `shelly_switch_config_t`             |
| Functions (exported) | `camelCase`         | `parseComponentKey`, `isRpcResponse` |
| Classes              | `PascalCase`        | `ShellyTransportBase`                |
| Private members      | `_camelCase` prefix | `_handleQueue()`, `_state`           |
| Constants            | `PascalCase` name   | `ShellyDebugLogLevel`                |
| Component files      | `PascalCase.ts`     | `Switch.ts`, `BTHomeSensor.ts`       |
| Utility files        | `camelCase.ts`      | `common.ts`, `helpers.ts`            |
| Tool scripts         | `kebab-case.ts`     | `commit-linter.ts`                   |
| Test files           | `{Module}.test.ts`  | `ShellyRpc.test.ts`                  |

### Component File Structure

Every component file follows a strict template in this order:

1. Imports
2. `export type shelly_{name}_type_t` — string literal for component type
3. `export type shelly_{name}_key_t` — template literal key (e.g., `` `switch:${id}` ``)
4. `export type shelly_{name}_status_t` — status object shape
5. `export type shelly_{name}_config_t` — config object shape
6. `export type shelly_{name}_rpc_method_map_t` — RPC method mapping (internal, not re-exported)
7. Optional: `export type shelly_{name}_webhook_event_t`

When adding a new component, follow this exact pattern and add selective re-exports to `src/index.ts`.

### Function Style

- Use `function` declarations for exported functions (not arrow functions)
- Arrow functions for callbacks, closures, and promise executors
- Class methods use standard method declarations
- Type guard functions return `data is SomeType` and validate fields sequentially without throwing

### Error Handling

- No custom error classes — use plain `Error`
- Transport layer uses Promise reject for error propagation
- Type guard functions (`isRpcResponse`, `isRpcNotification`) return booleans instead of throwing
- In catch blocks, cast with `e as Error` when needed

### Comments

- Minimal comments overall — code should be self-documenting
- JSDoc only for complex utility types and non-obvious public methods
- Inline comments for string literal union members to document meaning:
  ```typescript
  | 'activate' // state change by related input (activate mode)
  | 'ble'      // ble control
  ```

### Testing Conventions

- Framework: Vitest (v4+), globals enabled but tests import explicitly from `vitest`
- Tests in `tests/` directory (not co-located with source)
- Use `vi.fn()` for mocking, `vi.useFakeTimers()` for timer control
- Test abstract classes by creating concrete test subclasses
- Assertions use `expect()` with matchers like `.toBe()`, `.toEqual()`, `.toHaveBeenCalled()`

## TypeScript Configuration

- `strict: true` — all strict checks enabled
- `target: ESNext`, `module: NodeNext`
- `declaration: true` — generates `.d.ts` files
- Node 24+ runtime

## Directory Structure

```
src/
  index.ts                          # Package entry — selective re-exports
  ShellyRpc.ts                      # RPC types, type guards
  ShellyComponents.ts               # Component union types, parseComponentKey()
  transport/ShellyTransportBase.ts   # Abstract transport class
  components/
    common.ts, helpers.ts            # Shared types, utility types
    Switch.ts, Cover.ts, ...         # One file per component
    VirtualComponents/               # Virtual component types
    BTHomeComponents/                # BTHome sub-components
    KNXComponents/                   # KNX sub-components
tests/                               # Vitest test files
tools/                               # Dev scripts (not published)
```

## MCP Servers

When you need to look up Shelly RPC API documentation, use the `shelly-api-docs-next` MCP tools.
