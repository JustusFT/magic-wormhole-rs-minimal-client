# magic-wormhole-rs-minimal-client

This is a barebones client for using [magic-wormhole.rs](https://github.com/magic-wormhole/magic-wormhole.rs) in the browser.

## Development

### Prerequisites

- `node` (see [nvmrc](./.nvmrc) for required version)
  - if using `nvm`, can be set with:
      ```
      cd <PROJECT_ROOT_DIRECTORY>
      nvm install
      nvm use
      ```
- `git`

### Clone repository

```sh
# clone this repository
git clone https://github.com/JustusFT/magic-wormhole-rs-minimal-client.git
cd magic-wormhole-rs-minimal-client

# set up submodules
git submodule init
git submodule update
```

### Install dependencies

```
npm i
```

### Run development server

```
npm run serve
```

The server should now be running on `localhost:8080`.