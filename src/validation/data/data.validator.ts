import { isInt, isUUID } from 'class-validator'

export class DataValidator {
  public static isID(id: number): boolean {
    return !isNaN(id) && id > 0 && isInt(id)
  }

  public static isUUID(id: string): boolean {
    return isUUID(id)
  }

  public static checkForAnyValue<TData extends Object>(input: TData): boolean {
    return Object
      .values(input)
      .some(value => value !== null && value !== undefined && value !== '')
  }

  public static sanitizeArray<T>(array: T[]): T[] {
    return (array ?? []).filter((item): item is T => item != null)
  }

  public static validateFile(mimetype: string, mimeToken: string): boolean {
    return mimetype.startsWith(mimeToken)
  }
}