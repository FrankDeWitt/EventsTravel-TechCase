import { createUser } from '../../services/userService'

export default async function eventHandler(event): Promise<boolean> {
  const payload = await readBody(event)

  try {
    await createUser(payload)
  } catch (error) {
    console.error('Error:', error)
    return false
  }

  return true
}
