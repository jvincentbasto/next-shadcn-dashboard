import { FieldValues } from 'react-hook-form'
import { DynamicInput } from './string/DynamicInput'
import { DynamicEmail } from './string/DynamicEmail'
import { DynamicTextArea } from './string/DynamicTextArea'
import { DynamicOtp } from './number/DynamicOtp'
import { DynamicSwitch } from './boolean/DynamicSwitch'
import { DynamicSelect } from './array/DynamicSelect'
import { DynamicRadio } from './array/DynamicRadio'
import { DynamicCheckBox } from './array/DynamicCheckBox'
import { DynamicComboBox } from './array/DynamicComboBox'
import { DynamicFile } from './file/DynamicFile'
import { DynamicCalendar } from './datetime/DynamicCalendar'
import { TFieldDocument } from '@/db/mongodb/utilities'

//
export type TCustomFieldArrayDocument = {
  [key: string]: any
  key?: string
  value?: string
  label?: string
  values?: TCustomFieldArrayDocument[]
}
export type TCustomFieldArray = {
  [key: string]: any
  groups?: TCustomFieldArrayDocument[]
  values?: TCustomFieldArrayDocument[]
  className?: { [key: string]: any }
}

//
export type TCustomField = {
  [key: string]: any
  field: TFieldDocument
  formField: {
    [key: string]: any
  }
}

//
export const DynamicFieldString = ({
  properties
}: {
  [key: string]: any
  properties: TCustomField
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}

  //
  let component = null

  //
  if (type === 'string') {
    if (input === 'text') {
      component = DynamicInput({ properties })
    }
    if (input === 'email') {
      component = DynamicEmail({ properties })
    }
    if (input === 'textarea') {
      component = DynamicTextArea({ properties })
    }

    //
    return component
  }

  //
  return component
}

//
export const DynamicFieldNumber = ({
  properties
}: {
  [key: string]: any
  properties: TCustomField
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}

  //
  let component = null

  //
  if (type === 'number') {
    if (input === 'otp') {
      component = DynamicOtp({ properties: properties })
    }

    //
    return component
  }

  //
  return component
}

//
export const DynamicFieldBoolean = ({
  properties
}: {
  [key: string]: any
  properties: TCustomField
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}

  //
  let component = null

  //
  if (type === 'boolean') {
    if (input === 'switch') {
      component = DynamicSwitch({ properties: properties })
    }

    //
    return component
  }

  //
  return component
}

//
export const DynamicFieldArray = <TForm extends FieldValues>({
  properties,
  options,
  form
}: {
  [key: string]: any
  properties: TCustomField
  options: TCustomFieldArray
  form: TForm
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}

  //
  let component = null

  //
  if (type === 'array') {
    if (input === 'select') {
      component = DynamicSelect({ properties, options })
    }
    if (input === 'radio') {
      component = DynamicRadio({ properties, options })
    }
    if (input === 'checkbox') {
      component = DynamicCheckBox({
        properties,
        options,
        form
      })
    }
    if (input === 'combobox') {
      component = DynamicComboBox({
        properties,
        options,
        form
      })
    }

    //
    return component
  }

  //
  return component
}

//
export const DynamicFieldDate = ({
  properties,
  options
}: {
  [key: string]: any
  properties: TCustomField
  options: TCustomFieldArray
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}

  //
  let component = null

  //
  if (type === 'datetime') {
    if (input === 'calendar') {
      component = DynamicCalendar({ properties, options })
    }

    //
    return component
  }

  //
  return component
}

//
export const DynamicFieldFile = ({
  properties
}: {
  [key: string]: any
  properties: TCustomField
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}

  //
  let component = null

  //
  if (type === 'file') {
    if (input === 'file') {
      component = DynamicFile({ properties })
    }

    //
    return component
  }

  //
  return component
}

//
export const DynamicCustomField = <TForm extends FieldValues>({
  properties,
  options,
  form
}: {
  [key: string]: any
  properties: TCustomField
  options: TCustomFieldArray
  form: TForm
}) => {
  const { field } = properties ?? {}
  const { primaryType } = field ?? {}
  const { types } = primaryType ?? {}
  const { type } = types ?? {}

  //
  let component = null

  //
  if (type === 'string') {
    component = DynamicFieldString({ properties })
  }

  //
  if (type === 'number') {
    component = DynamicFieldNumber({ properties, options })
  }

  //
  if (type === 'boolean') {
    component = DynamicFieldBoolean({ properties, options })
  }

  //
  if (type === 'array') {
    component = DynamicFieldArray({ properties, options, form })
  }

  //
  if (type === 'date' || type === 'datetime') {
    component = DynamicFieldDate({ properties, options })
  }

  //
  if (type === 'file') {
    component = DynamicFieldFile({ properties })
  }

  //
  return component
}

export default DynamicCustomField
