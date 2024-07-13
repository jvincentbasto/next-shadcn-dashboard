import { ProjectSchema } from '@/db/mongodb/models/Schema'
import connectToDatabase from '@/db/mongodb/db'
import {
  formatDocument,
  formatDocuments,
  getSchemaFieldValidations,
  validateRouteDynamicFields
} from '@/db/mongodb/utilities/documents'
import { NextRequest, NextResponse } from 'next/server'
import { formFields } from '@/db/mongodb/definitions/schema'

export async function GET() {
  try {
    await connectToDatabase()
    const document = await ProjectSchema.find({})

    //
    const format = formatDocuments(document)
    return NextResponse.json({ success: true, data: format })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to get schemas' } },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { data } = body

  //
  try {
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Data is required' },
        { status: 400 }
      )
    }

    //
    const fields = getSchemaFieldValidations(formFields)
    const dataFields = validateRouteDynamicFields(data, fields)
    const {
      success: fieldSuccess,
      options: fieldOptions,
      ...fieldRest
    } = dataFields
    if (!fieldSuccess) {
      return NextResponse.json({ ...fieldRest }, { ...fieldOptions })
    }

    //
    await connectToDatabase()
    const document = await ProjectSchema.create(data)

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to create schema' } },
      { status: 500 }
    )
  }
}
