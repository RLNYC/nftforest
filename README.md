# NFT Forest

# 🚀 Quick Start

Sponsor Tech Components:
- Chainlink: Chainlink VRF is used to generate rebate after purchasing
- Polygon: Dapp is deployed to Polygon Testnet 
- IPFS: Use Pinata to store images and Off-chain data of tree on IPFS
- Moralis: Use Moralis login and SDK to interact with smart contract
- Covalent: Obtain user wallet data

📄 Clone or fork this repo:
```
💿 Install all dependencies:
```sh
cd ethereum-nft-marketplace-boilerplate
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🔎 Locate the MoralisDappProvider in `src/providers/MoralisDappProvider/MoralisDappProvider.js` and paste the deployed marketplace smart contract address and ABI
```jsx
const [contractABI, setContractABI] = useState();
const [marketAddress, setMarketAddress] = useState();
```

🚴‍♂️ Run your App:
```sh
yarn start
```

