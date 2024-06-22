import connectToDatabase from '@/db/mongodb/db'
import User from '@/db/mongodb/models/Users'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()
    const users = await User.find({})

    //
    const userJson = NextResponse.json({ success: true, data: users })

    //
    return userJson
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email } = body

  //
  if (!name || !email) {
    return NextResponse.json(
      { success: false, error: 'Name and email are required' },
      { status: 400 }
    )
  }

  //
  try {
    await connectToDatabase()
    const newUser = new User({ name, email })
    await newUser.save()

    //
    return NextResponse.json({ success: true, data: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
