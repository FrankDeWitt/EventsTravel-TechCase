import { removeTravel } from '../../services/travelService'

export default async function eventHandler(event): Promise<boolean> {
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
