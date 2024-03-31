export interface Travel {
  id?: number
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

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  age: number
  gender: 'Male' | 'Female'
  paymentMethod: 'paypal' | 'revolut' | 'bank transfer'
  travelId: number
  notes?: string
}

export type Users = User[]
