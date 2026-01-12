import { Injectable } from '@nestjs/common'
import { IDType } from '@src/common/enums/id-type.enum'
import { DataValidator } from '@src/validator/data/data.validator'

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
}