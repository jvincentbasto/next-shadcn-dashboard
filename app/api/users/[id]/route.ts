import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/db/mongodb/db'
import User from '@/db/mongodb/models/User'
import {
  formatDocument,
  getSchemaFieldValidations,
  validateRouteDynamicFields
} from '@/db/mongodb/utilities/documents'
import { formFields } from '@/db/mongodb/definitions/user'

//
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  //
  try {
    await connectToDatabase()
    const document = await User.findById(id)

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'User not found' } },
        { status: 404 }
      )
    }

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to get user' } },
      { status: 500 }
    )
  }
}

//
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
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
    const document = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    })

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'User not found' } },
        { status: 404 }
      )
    }

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update user' } },
      { status: 500 }
    )
  }
}

//
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  //
  try {
    await connectToDatabase()
    const document = await User.findByIdAndDelete(id)

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'User not found' } },
        { status: 404 }
      )
    }

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to delete user' } },
      { status: 500 }
    )
  }
}
