import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

// POST sync user from Clerk to database
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, name, username, avatar } = user

    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email: email || '',
        name: name || '',
        username: username || undefined,
        avatar: avatar || undefined,
      },
      create: {
        clerkId: user.id,
        email: email || '',
        name: name || '',
        username: username || undefined,
        avatar: avatar || undefined,
      },
    })

    return NextResponse.json(dbUser)
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET current user
export async function GET(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(dbUser)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
