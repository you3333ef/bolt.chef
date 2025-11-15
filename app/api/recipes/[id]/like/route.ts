import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

// POST toggle like on recipe
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if already liked
    const existingLike = await prisma.recipeLike.findUnique({
      where: {
        userId_recipeId: {
          userId: dbUser.id,
          recipeId: params.id,
        },
      },
    })

    if (existingLike) {
      // Unlike
      await prisma.recipeLike.delete({
        where: { id: existingLike.id },
      })
      return NextResponse.json({ liked: false })
    } else {
      // Like
      await prisma.recipeLike.create({
        data: {
          userId: dbUser.id,
          recipeId: params.id,
        },
      })
      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
