import { Address } from 'viem'
import getStackClient from './getStackClient'
import { FIRST_SMART_WALLET_LOGIN_EVENT } from '../consts'

const getLoginEvents = async (address: Address) => {
  try {
    const stackClient = getStackClient()
    const events = await stackClient.getEvents({
      address,
      event: FIRST_SMART_WALLET_LOGIN_EVENT,
    })

    return events
  } catch (error) {
    return { error }
  }
}

export default getLoginEvents
