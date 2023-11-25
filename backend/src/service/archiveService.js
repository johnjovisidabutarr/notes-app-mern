import { prismaClient } from '../application/database.js'

const add = async (id) => {
  const result = await prismaClient.note.update({
    data: {
      archive: true,
    },
    where: {
      id,
    },
  })
  return result
}
const remove = async (id) => {
  const result = await prismaClient.note.update({
    data: {
      archive: false,
    },
    where: {
      id,
    },
  })
  return result
}

const get = async (auth) => {
  const result = await prismaClient.note.findMany({
    where: {
      ownerId: auth,
      archive: true,
    },
  })

  return result
}

export default { add, remove, get }
