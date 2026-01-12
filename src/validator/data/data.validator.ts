import { isInt, isUUID } from 'class-validator'

export class DataValidator {
  public static isID(id: number): boolean {
    return !isNaN(id) && id > 0 && isInt(id)
  }

  public static isUUID(id: string): boolean {
    return isUUID(id)
  }
}