import type { User } from '@/types'

export const useGetUsers = () => {
  const { data: users, error, pending, refresh } = useFetch<User[]>('/api/user/users')

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch users avaliables.`,
    })
  }

  return { users, pending, refresh }
}
