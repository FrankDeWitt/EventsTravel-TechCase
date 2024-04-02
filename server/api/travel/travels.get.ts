import dayjs from 'dayjs'

import { getTravels } from '../../services/travelService'

import type { Travels } from '@/types'

export default eventHandler(async (event) => {
  const travels: Travels = getTravels()
  const { q, priceMin, priceMax, rating, departureDate } = getQuery(event) as {
    q?: string
    priceMin?: number
    priceMax?: number
    rating?: number
    departureDate?: Date
  }

  await new Promise(function (resolve) {
    setTimeout(resolve, 1000)
  })

  return travels
    .filter((travel) => {
      if (!q) return true

      return travel.name.search(new RegExp(q, 'i')) !== -1 || travel.name.search(new RegExp(q, 'i')) !== -1
    })
    .filter((travel) => {
      if (priceMin === undefined || priceMax === undefined) {
        return true
      }

      if (travel.price !== null && travel.price !== undefined && priceMin !== undefined && priceMax !== undefined) {
        return travel.price >= priceMin && travel.price <= priceMax
      }
    })
    .filter((travel) => {
      if (!rating) return true

      return Math.floor(travel.averageRating) >= Math.floor(rating)
    })
    .filter((travel) => {
      if (!departureDate) return true

      const parsedDate = dayjs(travel.departureDate, 'DD/MM/YYYY').toDate()
      const parsedDepartureDate = dayjs(departureDate, 'DD/MM/YYYY').toDate()
      return dayjs(parsedDate).isAfter(dayjs(parsedDepartureDate).subtract(1, 'day'))
    })
})
