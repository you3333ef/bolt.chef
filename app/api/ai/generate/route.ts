import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import { generateCode, generateRecipe, chatWithAI } from '@/lib/ai'

// POST AI generation endpoint
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { type, prompt, provider, model, ...options } = body

    if (!type || !prompt) {
      return NextResponse.json({ error: 'Type and prompt are required' }, { status: 400 })
    }

    let result

    switch (type) {
      case 'code': {
        result = await generateCode(prompt, provider, model)
        break
      }

      case 'recipe': {
        const { ingredients, preferences } = options
        if (!ingredients || !Array.isArray(ingredients)) {
          return NextResponse.json({ error: 'Ingredients array is required' }, { status: 400 })
        }
        result = await generateRecipe(ingredients, preferences, provider)
        break
      }

      case 'chat': {
        const { messages } = options
        if (!messages || !Array.isArray(messages)) {
          return NextResponse.json({ error: 'Messages array is required' }, { status: 400 })
        }
        result = await chatWithAI(messages, provider, model)
        break
      }

      default:
        return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 })
    }

    return NextResponse.json({ result })
  } catch (error: any) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: error.message || 'AI generation failed' },
      { status: 500 }
    )
  }
}
