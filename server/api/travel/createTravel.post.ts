import { createTravel } from '../../services/travelService'

import type { H3Event } from 'h3'

export default async function eventHandler(event: H3Event): Promise<boolean> {
  const payload = await readBody(event)

  try {
    await createTravel(payload)
  } catch (error) {
    console.error('Error:', error)
    return false
  }

  return true
}
