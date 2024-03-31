import { getUsers } from '../../services/userService'

import type { Users } from '@/types'

export default eventHandler(async () => {
  const travels: Users = getUsers()

  await new Promise(function (resolve) {
    setTimeout(resolve, 1000)
  })

  return travels
})
