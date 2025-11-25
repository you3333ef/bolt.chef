import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

// GET all recipes
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const cuisine = searchParams.get('cuisine')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: any = { isPublic: true }
    if (category) where.category = category
    if (cuisine) where.cuisine = cuisine

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              username: true,
              avatar: true,
            },
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.recipe.count({ where }),
    ])

    return NextResponse.json({
      recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create new recipe
export async function POST(req: NextRequest) {
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

    const body = await req.json()
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      cuisine,
      tags,
      images,
      nutrition,
      aiGenerated,
      aiPrompt,
    } = body

    if (!title || !ingredients || !instructions) {
      return NextResponse.json(
        { error: 'Title, ingredients, and instructions are required' },
        { status: 400 }
      )
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        servings,
        difficulty,
        category,
        cuisine,
        tags: tags || [],
        images: images || [],
        nutrition,
        aiGenerated: aiGenerated || false,
        aiPrompt,
        userId: dbUser.id,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
