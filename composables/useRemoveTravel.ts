export const useRemoveTravel = async (travelId: number) => {
  await $fetch('/api/travel/removeTravel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: travelId,
    }),
  })
}
