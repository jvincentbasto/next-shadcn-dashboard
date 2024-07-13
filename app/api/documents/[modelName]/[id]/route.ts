import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/db/mongodb/db'
import {
  createRouteDynamicModel,
  getRouteDynamicModel
} from '@/db/mongodb/utilities/ssrDocument'
import {
  formatDocument,
  validateRouteDynamicFields
} from '@/db/mongodb/utilities/documents'

//
export async function GET(
  request: NextRequest,
  { params }: { params: { modelName: string; id: string } }
) {
  const { modelName, id } = params

  //
  const documentModelName = modelName

  //
  const dataModel = getRouteDynamicModel(documentModelName)
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
    const documentId = id
    if (!documentId) {
      return NextResponse.json(
        { success: false, error: { message: 'Document id is required' } },
        { status: 400 }
      )
    }

    //
    await connectToDatabase()
    const document = await dynamicModel.findById(documentId)

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'Document not found' } },
        { status: 404 }
      )
    }

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to get document' } },
      { status: 500 }
    )
  }
}

//
export async function PUT(
  request: NextRequest,
  { params }: { params: { modelName: string; id: string } }
) {
  const { modelName, id } = params

  //
  const body = await request.json()
  const {
    modelName: modelNameReq,
    id: idReq,
    schemaDefinition,
    data,
    fields = []
  } = body
  const documentModelName = modelName ?? modelNameReq

  //
  const dataModel = createRouteDynamicModel(documentModelName, schemaDefinition)
  const {
    success: modelSuccess,
    data: dynamicModel,
    options: modelOptions,
    ...modelRest
  } = dataModel
  if (!modelSuccess) {
    return NextResponse.json({ ...modelRest }, { ...modelOptions })
  }

  try {
    //
    if (!data) {
      return NextResponse.json(
        { success: false, error: { message: 'Data is required' } },
        { status: 400 }
      )
    }

    //
    const documentId = id ?? idReq
    if (!documentId) {
      return NextResponse.json(
        { success: false, error: { message: 'Document id is required' } },
        { status: 400 }
      )
    }

    //
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
    const document = await dynamicModel.findByIdAndUpdate(documentId, data, {
      new: true,
      runValidators: true
    })

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'Document not found' } },
        { status: 404 }
      )
    }

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to create document' } },
      { status: 500 }
    )
  }
}

//
export async function DELETE(
  request: NextRequest,
  { params }: { params: { modelName: string; id: string } }
) {
  const { modelName, id } = params

  //
  const dataModel = getRouteDynamicModel(modelName)
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
    const documentId = id
    if (!documentId) {
      return NextResponse.json(
        { success: false, error: { message: 'Document id is required' } },
        { status: 400 }
      )
    }

    //
    await connectToDatabase()
    const document = await dynamicModel.findByIdAndDelete(documentId)

    //
    if (!document) {
      return NextResponse.json(
        { success: false, error: { message: 'Document not found' } },
        { status: 404 }
      )
    }

    //
    const format = formatDocument(document)
    return NextResponse.json({ success: true, data: format }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to delete document' } },
      { status: 500 }
    )
  }
}
