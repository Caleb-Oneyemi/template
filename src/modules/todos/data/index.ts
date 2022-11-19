import { ClientSession } from 'mongoose'
import { Todo } from '../models'
import { TodoAttributes, TodoQueryInput } from '../types'

export const createTodo = (input: TodoAttributes) => {
  return Todo.build(input)
}

/** PAGINATED WITH DEFAULT OF TEN DOCUMENTS PER PAGE */
export const getAllTodos = ({
  page = 1,
  limit = 10,
  sort = 'desc',
  filter,
}: TodoQueryInput & { filter: Record<string, unknown> }) => {
  return Todo.find(filter)
    .sort({ createdAt: sort })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate({
      path: 'owner',
      select: 'firstName lastName photUrl -_id -type',
    })
    .exec()
}

/** PAGINATED WITH DEFAULT OF TEN DOCUMENTS PER PAGE */
export const getUserTodos = ({
  page = 1,
  limit = 10,
  sort = 'desc',
  filter,
}: TodoQueryInput & { filter: Record<string, unknown> }) => {
  return Todo.find(filter)
    .sort({ createdAt: sort })
    .limit(limit)
    .skip((page - 1) * limit)
    .exec()
}

export const getTodoByPublicId = async (publicId: string, populate = false) => {
  if (!populate) {
    return Todo.findOne({ publicId })
  }

  return Todo.findOne({ publicId })
    .populate({
      path: 'owner',
      select: 'firstName lastName photUrl -_id -type',
    })
    .exec()
}

export const updateTodo = (
  publicId: string,
  input: Partial<TodoAttributes>,
) => {
  return Todo.findOneAndUpdate(
    { publicId },
    { $set: input },
    { new: true },
  ).exec()
}

export const deleteTodo = (publicId: string) => {
  return Todo.findOneAndDelete({ publicId }).exec()
}

export const getTotalTodoCount = (filter: Record<string, unknown>) => {
  return Todo.countDocuments(filter)
}

export const getTotalUserTodoCount = (filter: Record<string, unknown>) => {
  return Todo.countDocuments(filter)
}

export const deleteUserTodos = (ownerId: string, session: ClientSession) => {
  return Todo.deleteMany({ owner: ownerId }, { session })
}
