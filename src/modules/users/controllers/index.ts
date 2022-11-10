import httpStatus from 'http-status'
import * as UserService from '../services'
import {
  ResponseData,
  ControllerInput,
  controllerWrapper,
  AppUserAttributes,
} from '../../../common'

export const createUser = controllerWrapper(
  httpStatus.CREATED,
  async ({
    input,
  }: ControllerInput<AppUserAttributes>): Promise<ResponseData> => {
    const result = await UserService.createUser(input)
    return result
  },
)

export const verifyToken = controllerWrapper(
  httpStatus.OK,
  async ({ params }): Promise<ResponseData> => {
    await UserService.verifyAccount(params.token)
    return null
  },
)
