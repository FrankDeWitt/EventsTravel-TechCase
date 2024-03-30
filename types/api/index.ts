export interface Travel {
  id: number
  name: string
  departureDate: string
  returnDate: string
  picture: string
  description: string
  price: number
  averageRating: number
}

export type Travels = Travel[]

export type Query = {
  q: string
  price: number | undefined
  rating: number | null
}
