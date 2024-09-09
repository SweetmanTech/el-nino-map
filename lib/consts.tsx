import { base, baseSepolia } from 'thirdweb/chains'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id

// Zora
export const DROP_ADDRESS = IS_TESTNET
  ? '0x0b93a56db47797142076e24c520c846c9bd0d6fa' // base sepolia
  : '0x16F1FC98282AFDA367999012027b5A3fA656a713' // base mainnet

export const ZORA_PRICE = '777000000000000'

export const COMMENT = 'XCELENCIA - ERC6551 smart album 🪄'
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const SMART_WALLET_LOGIN_POINT = 11
export const POINT_SYSTEM_ID = 2995
export const MINT_REFERRAL = '0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38'
