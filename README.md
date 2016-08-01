Ethereum Classic API
==================================

An open source Ethereum Classic API

Getting Started
---------------

```sh
# Clone the repository
git clone https://github.com/masonicGIT/ethereum-api.git
cd ethereum-api

# Install the dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server
npm start
```

Usage
---------------
```sh

#  get balance

curl localhost:8080/api/v1/etc/balance/:address

response:

{"address":"0xd66e645fcb0b971b5ecd7ee3047f61d8eb0dae9b","balance":{"wei":"163168220000000000","ether":"0.16316822"}}

# post raw transaction

curl -X POST -H 'Content-Type: application/json' -d '{"rawtx": "f86b46 ... 828703c"}' localhost:8080/api/v1/etc/transaction

response:

{"data":"0x803c53376106c3624346ff0550eeab8b7750a883da2bfd1de8a1159af3019067","message":"","error":false}

```

License
-------

MIT
