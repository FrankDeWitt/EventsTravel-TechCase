import type { Travel, Query } from '@/types'

export const useGetTravels = async (query: Query) => {
  const {
    data: travels,
    error,
    pending,
    refresh,
  } = await useFetch<Travel[]>('/api/travels', { query, default: () => [] })

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Couldn't fetch travels avaliables.`,
    })
  }

  return { travels, pending, refresh }
}
