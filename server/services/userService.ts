import staticUsers from '../usersData'
import type { Users, User } from '@/types'

const users: Users = [...staticUsers]

export function getUsers(): Users {
  return users
}
export async function createUser(newUsersData: User): Promise<void> {
  const newId = users.reduce((maxId, Users) => Math.max(maxId, Users.id ?? 0), 0) + 1

  if (newId !== -1) {
    users.push({ ...newUsersData, id: newId })
    console.log(`🚀 ~ Users with id ${newId} has been uploaded.`)
  } else {
    console.log(`An error occurred while uploading the Users.`)
  }
}
