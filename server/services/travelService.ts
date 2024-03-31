import staticTravels from '../travelsData'
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
export async function createTravel(newTravelData: Travel): Promise<void> {
  const newId = travels.reduce((maxId, travel) => Math.max(maxId, travel.id ?? 0), 0) + 1

  if (newId !== -1) {
    travels.push({ ...newTravelData, id: newId })
    console.log(`🚀 ~ Travel with id ${newId} has been uploaded.`)
  } else {
    console.log(`An error occurred while uploading the travel.`)
  }
}
