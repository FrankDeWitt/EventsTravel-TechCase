import staticTravels from '../data'
import type { Travels, Travel } from '@/types'

let travels: Travels = [...staticTravels]

export function getTravels(): Travels {
  return travels
}

export async function removeTravel(idToRemove: number): Promise<void> {
  travels = travels.filter((travel: Travel) => travel.id !== idToRemove)
}

export async function editTravel(newTravelData: Travel): Promise<void> {
  const index = travels.findIndex((travel) => travel.id === newTravelData.id)

  if (index !== -1) {
    travels[index] = newTravelData
    console.log(`🚀 ~ Travel with id ${newTravelData.id} has been updated.`)
  } else {
    console.log(`Travel with id ${newTravelData.id} not found.`)
  }
}
