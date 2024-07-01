import connectToDatabase from '@/db/mongodb/db'
import {
  createRouteDynamicModel,
  getRouteDynamicModel,
  validateRouteDynamicFields
} from '@/db/mongodb/models/dynamic'
import { NextRequest, NextResponse } from 'next/server'

//
export async function GET(
  request: NextRequest,
  { params }: { params: { modelName: string } }
) {
  const { modelName } = params

  //
  let dataModel = getRouteDynamicModel(modelName)
  const {
    success: modelSuccess,
    data: dynamicModel,
    options,
    ...rest
  } = dataModel
  if (!modelSuccess) {
    return NextResponse.json({ success: modelSuccess, ...rest }, { ...options })
  }

  try {
    await connectToDatabase()
    const documents = await dynamicModel.find({})

    //
    if (!documents) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          error: { data: [], message: 'Document not found' }
        },
        { status: 404 }
      )
    }

    //
    return NextResponse.json(
      { success: true, data: documents },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to get documents' } },
      { status: 500 }
    )
  }
}

//
export async function POST(
  request: NextRequest,
  { params }: { params: { modelName: string } }
) {
  const { modelName } = params

  //
  const body = await request.json()
  const { modelName: modelNameReq, schemaDefinition, data, fields = [] } = body

  //
  const dataModel = createRouteDynamicModel(
    modelName ?? modelNameReq,
    schemaDefinition
  )
  const {
    success: modelSuccess,
    data: dynamicModel,
    options: modelOptions,
    ...modelRest
  } = dataModel
  if (!modelSuccess) {
    return NextResponse.json({ ...modelRest }, { ...modelOptions })
  }

  //
  try {
    //
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Data is required' },
        { status: 400 }
      )
    }

    //
    const dataFields = validateRouteDynamicFields(fields)
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
    const document = await dynamicModel.create(data)

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'Document not found' } },
        { status: 404 }
      )
    }
    console.log('post document',document);
    console.log('data',data);

    //
    return NextResponse.json({ success: true, data: document }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create document' },
      { status: 500 }
    )
  }
}
