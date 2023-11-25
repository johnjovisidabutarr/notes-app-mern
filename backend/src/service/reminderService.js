import { prismaClient } from '../application/database.js'

const getReminder = async (auth) => {
  const result = await prismaClient.note.findMany({
    where: {
      ownerId: auth,
      reminder: true,
    },
    orderBy: {
      dueTime: 'asc',
    },
  })
  return result
}

export default {
  getReminder,
}
