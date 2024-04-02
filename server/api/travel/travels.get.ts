import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { getTravels } from '../../services/travelService'

import type { Travels } from '@/types'

export default eventHandler(async (event) => {
  const travels: Travels = getTravels()
  const { q, price, rating, departureDate } = getQuery(event) as {
    q?: string
    price?: number
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
      if (price === undefined || price === 0) return true

      return travel.price <= price
    })
    .filter((travel) => {
      if (!rating) return true

      return Math.floor(travel.averageRating) >= Math.floor(rating)
    })
    .filter((travel) => {
      if (!departureDate) return true
      dayjs.extend(customParseFormat)
      const parsedDate = dayjs(travel.departureDate, 'DD/MM/YYYY').toDate()
      const parsedDepartureDate = dayjs(departureDate, 'DD/MM/YYYY').toDate()
      return dayjs(parsedDate).isAfter(dayjs(parsedDepartureDate).subtract(1, 'day'))
    })
})
