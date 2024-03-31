import type { PaymentMethodValue } from '@/types'

export interface PaymentMethod {
  id: number
  value: PaymentMethodValue
  logo: string
}
