import connectToDatabase from '@/db/mongodb/db'
import { formFields } from '@/db/mongodb/definitions/user'
import User from '@/db/mongodb/models/User'
import {
  formatDocument,
  formatDocuments,
  getSchemaFieldValidations,
  validateRouteDynamicFields
} from '@/db/mongodb/utilities/documents'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()
    const document = await User.find({})

    //
    const format = formatDocuments(document)
    return NextResponse.json({ success: true, data: format })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to get users' } },
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
    const document = await User.create(data)

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to create user' } },
      { status: 500 }
    )
  }
}
