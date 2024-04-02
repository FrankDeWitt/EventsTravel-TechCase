export enum PaymentMethodValue {
  Paypal = 'Paypal',
  Revolut = 'Revolut',
  BankTransfer = 'Bank Transfer',
}
export enum GenderValue {
  Male = 'Male',
  Female = 'Female',
}

export interface Travel {
  id?: number
  name: string
  departureDate: string
  returnDate: string
  picture: string
  description: string
  price: number | null
  averageRating: number
}

export type Travels = Travel[]

export type Query = {
  q: string
  priceMin: number
  priceMax: number
  rating: number | null
  departureDate: string | undefined
}

export interface User {
  id?: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  birthDate: string | undefined
  gender: GenderValue
  paymentMethod: PaymentMethodValue
  travelId: number | null
  notes?: string
}

export type Users = User[]
