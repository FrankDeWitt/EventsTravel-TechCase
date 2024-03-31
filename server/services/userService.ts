import staticUsers from '../usersData'
import type { Users, User } from '@/types'

let users: Users = [...staticUsers]

export function getUsers(): Users {
  return users
}

export async function removeUsers(idToRemove: number): Promise<void> {
  users = users.filter((Users: User) => Users.id !== idToRemove)
}

export async function editUsers(newUsersData: User): Promise<void> {
  const index = users.findIndex((Users) => Users.id === newUsersData.id)

  if (index !== -1) {
    users[index] = newUsersData
    console.log(`🚀 ~ Users with id ${newUsersData.id} has been updated.`)
  } else {
    console.log(`Users with id ${newUsersData.id} not found.`)
  }
}
export async function createUsers(newUsersData: User): Promise<void> {
  const newId = users.reduce((maxId, Users) => Math.max(maxId, Users.id ?? 0), 0) + 1

  if (newId !== -1) {
    users.push({ ...newUsersData, id: newId })
    console.log(`🚀 ~ Users with id ${newId} has been uploaded.`)
  } else {
    console.log(`An error occurred while uploading the Users.`)
  }
}
