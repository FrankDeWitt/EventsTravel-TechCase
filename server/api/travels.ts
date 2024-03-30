import { travels as allTravels } from '@/db.json'

import type { Travels } from '@/types'

allTravels as Travels

export default defineEventHandler(async () => {
  return allTravels
})
