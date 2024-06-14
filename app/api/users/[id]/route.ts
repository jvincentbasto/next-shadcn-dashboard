import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/db/mongodb/db'
import User from '@/db/mongodb/models/Users'

//
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params
    const user = await User.findById(id)

    //
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    //
    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get user' },
      { status: 500 }
    )
  }
}

//
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params
    const body = await request.json()

    //
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    })

    //
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    //
    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

//
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params
    const user = await User.findByIdAndDelete(id)

    //
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    //
    return NextResponse.json({ success: true, data: id }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
