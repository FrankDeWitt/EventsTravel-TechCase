import type { Travel } from '@/types'

export const useEditTravel = async (travelData: Travel) => {
  await $fetch('/api/travel/editTravel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(travelData),
  })
}
