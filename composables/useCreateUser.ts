import type { User } from '@/types'

export const useCreateUser = async (travelData: User) => {
  await $fetch('/api/user/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(travelData),
  })
}
