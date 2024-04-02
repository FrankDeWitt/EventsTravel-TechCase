import type { Travel } from '@/types'

export const useCreateTravel = async (travelData: Travel) => {
  await $fetch('/api/travel/createTravel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(travelData),
  })
}
