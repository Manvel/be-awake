Browser extension for overriding operation system's power management features,
through action icon in toolbar for Chrome OS and Chromium based browsers.

## Installation link(Chrome web store):
https://chrome.google.com/webstore/detail/be-awake/ibaenepllmhoekeccnhdbnijijebehdl

## Manual installation:
1. Visit `chrome://extensions` in your browser.
1. Ensure that the Developer mode checkbox in the top right-hand corner is checked.
1. Click Load unpacked button.
1. Locate and load `src` folder in the repository root directory.

## Testing

```sh
npm i       # Install dependencies
npm test    # Run tests
```

## Generating translations file

```
npm run localize
```

## Publishing

```
npm run build
```
