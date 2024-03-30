import type { Travel, Query } from '@/types'

export const useGetTravels = (query: Query | {}) => {
  const { data: travels, error, pending, refresh } = useFetch<Travel[]>('/api/travels', { query, default: () => [] })

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch travels avaliables.`,
    })
  }

  return { travels, pending, refresh }
}
