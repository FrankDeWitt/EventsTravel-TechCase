export const useRemoveTravel = async (travelId: number) => {
  await useFetch('/api/travel/removeTravel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: travelId,
    }),
  })
}
