import { Injectable } from '@nestjs/common'
import { IDType } from '@src/common/enums/id-type.enum'
import { DataValidator } from '@src/validation/data/data.validator'

@Injectable()
export class DataValidatorProvider {
  public validateId(id: number | string, type: IDType): boolean {
    switch (type) {
      case IDType.Auto:
        return DataValidator.isID(id as number)
      case IDType.UUID:
        return DataValidator.isUUID(id as string)
    }
  }

  public checkForAnyValue<TData extends Object>(data: TData): boolean {
    return DataValidator.checkForAnyValue(data)
  }

  public sanitizeArray<T>(array: T[]): T[] {
    return DataValidator.sanitizeArray<T>(array)
  }

  public validateFile(mimetype: string, mimeToken: string): boolean {
    return DataValidator.validateFile(mimetype, mimeToken)
  }
}