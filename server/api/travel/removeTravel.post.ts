import { removeTravel } from '../../services/travelService'

import type { H3Event } from 'h3'

export default async function eventHandler(event: H3Event): Promise<boolean> {
  const payload = await readBody(event)
  const idToRemove = payload.id

  try {
    await removeTravel(idToRemove)
  } catch (error) {
    console.error('Error:', error)
    return false
  }

  return true
}
