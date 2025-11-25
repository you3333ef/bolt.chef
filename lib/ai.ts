import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

// AI Provider Factory - All providers from bolt.diy
export class AIProviderFactory {
  private static openai: OpenAI | null = null
  private static anthropic: Anthropic | null = null
  private static google: GoogleGenerativeAI | null = null

  static getOpenAI(): OpenAI {
    if (!this.openai) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
    return this.openai
  }

  static getAnthropic(): Anthropic {
    if (!this.anthropic) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      })
    }
    return this.anthropic
  }

  static getGoogle(): GoogleGenerativeAI {
    if (!this.google) {
      this.google = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')
    }
    return this.google
  }

  // All providers from bolt.diy - Complete List
  static async generateWithProvider(
    prompt: string,
    provider: string,
    model?: string
  ): Promise<string> {
    try {
      switch (provider) {
        case 'openai':
          return await this.generateWithOpenAI(prompt, model)
        case 'anthropic':
          return await this.generateWithAnthropic(prompt, model)
        case 'google':
          return await this.generateWithGoogle(prompt, model)
        case 'groq':
          return await this.generateWithGroq(prompt, model)
        case 'mistral':
          return await this.generateWithMistral(prompt, model)
        case 'cohere':
          return await this.generateWithCohere(prompt, model)
        case 'together':
          return await this.generateWithTogether(prompt, model)
        case 'perplexity':
          return await this.generateWithPerplexity(prompt, model)
        case 'huggingface':
          return await this.generateWithHuggingFace(prompt, model)
        case 'openrouter':
          return await this.generateWithOpenRouter(prompt, model)
        case 'moonshot':
        case 'kimi':
          return await this.generateWithMoonshot(prompt, model)
        case 'hyperbolic':
          return await this.generateWithHyperbolic(prompt, model)
        case 'ollama':
          return await this.generateWithOllama(prompt, model)
        case 'lmstudio':
          return await this.generateWithLMStudio(prompt, model)
        case 'xai':
          return await this.generateWithXAI(prompt, model)
        case 'bedrock':
          return await this.generateWithBedrock(prompt, model)
        case 'deepseek':
          return await this.generateWithDeepSeek(prompt, model)
        case 'github':
          return await this.generateWithGitHub(prompt, model)
        case 'novita':
          return await this.generateWithNovita(prompt, model)
        case 'ai21':
          return await this.generateWithAI21(prompt, model)
        case 'replicate':
          return await this.generateWithReplicate(prompt, model)
        case 'fireworks':
          return await this.generateWithFireworks(prompt, model)
        case 'together-vllm':
          return await this.generateWithTogetherVLLM(prompt, model)
        default:
          throw new Error(`Unsupported provider: ${provider}`)
      }
    } catch (error) {
      console.error(`Error generating with ${provider}:`, error)
      throw error
    }
  }

  private static async generateWithOpenAI(prompt: string, model?: string): Promise<string> {
    const openai = this.getOpenAI()
    const completion = await openai.chat.completions.create({
      model: model || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert software developer and AI assistant.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })
    return completion.choices[0]?.message?.content || ''
  }

  private static async generateWithAnthropic(prompt: string, model?: string): Promise<string> {
    const anthropic = this.getAnthropic()
    const message = await anthropic.messages.create({
      model: model || 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })
    return message.content[0]?.type === 'text' ? message.content[0].text : ''
  }

  private static async generateWithGoogle(prompt: string, model?: string): Promise<string> {
    const google = this.getGoogle()
    const geminiModel = google.getGenerativeModel({ model: model || 'gemini-pro' })
    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  }

  private static async generateWithGroq(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithMistral(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'mistral-medium-latest',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithCohere(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        model: model || 'command-r',
      }),
    })
    const data = await response.json()
    return data.text || ''
  }

  private static async generateWithTogether(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'meta-llama/Llama-2-70b-chat-hf',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithPerplexity(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'llama-3-sonar-small-128k-online',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithHuggingFace(prompt: string, model?: string): Promise<string> {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model || 'microsoft/DialoGPT-large'}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    })
    const data = await response.json()
    return Array.isArray(data) ? data[0]?.generated_text || '' : ''
  }

  private static async generateWithOpenRouter(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL,
        'X-Title': 'Bolt Chef',
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithMoonshot(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'moonshot-v1-8k',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithHyperbolic(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.hyperbolic.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HYPERBOLIC_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'meta-llama/Llama-2-70b-chat-hf',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithOllama(prompt: string, model?: string): Promise<string> {
    const response = await fetch(`${process.env.OLLAMA_URL || 'http://localhost:11434'}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'llama2',
        prompt: prompt,
        stream: false,
      }),
    })
    const data = await response.json()
    return data.response || ''
  }

  private static async generateWithLMStudio(prompt: string, model?: string): Promise<string> {
    const response = await fetch(`${process.env.LMSTUDIO_URL || 'http://localhost:1234'}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LMSTUDIO_API_KEY || 'lm-studio'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'local-model',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithXAI(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'grok-beta',
        messages: [
          { role: 'system', content: 'You are Grok, a helpful AI assistant.' },
          { role: 'user', content: prompt }
        ],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithNovita(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.novita.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOVITA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'meta-llama/Llama-2-70b-chat-hf',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithAI21(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.ai21.com/studio/v1/j1-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AI21_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        maxTokens: 1000,
      }),
    })
    const data = await response.json()
    return data.completions?.[0]?.text || ''
  }

  private static async generateWithReplicate(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: model || 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
        input: { prompt: prompt },
      }),
    })
    const prediction = await response.json()

    // Poll for result
    let result = prediction
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.REPLICATE_API_KEY}`,
        },
      })
      result = await pollResponse.json()
    }

    return result.output?.[0] || ''
  }

  private static async generateWithFireworks(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FIREWORKS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'accounts/fireworks/models/llama-v2-70b-chat',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithTogetherVLLM(prompt: string, model?: string): Promise<string> {
    const response = await fetch(`${process.env.TOGETHER_API_URL || 'https://api.together.xyz'}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithBedrock(prompt: string, model?: string): Promise<string> {
    // AWS Bedrock integration would go here
    // This is a placeholder for the integration
    throw new Error('Bedrock integration not yet implemented')
  }

  private static async generateWithDeepSeek(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }

  private static async generateWithGitHub(prompt: string, model?: string): Promise<string> {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_MODELS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  }
}

// Generate Code with AI (Bolt.diy feature)
export async function generateCode(
  prompt: string,
  provider: 'openai' | 'anthropic' | 'google' = 'openai',
  model?: string
): Promise<string> {
  try {
    switch (provider) {
      case 'openai': {
        const openai = AIProviderFactory.getOpenAI()
        const completion = await openai.chat.completions.create({
          model: model || 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert software developer. Generate clean, production-ready code based on user requirements.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        })
        return completion.choices[0]?.message?.content || ''
      }

      case 'anthropic': {
        const anthropic = AIProviderFactory.getAnthropic()
        const message = await anthropic.messages.create({
          model: model || 'claude-3-5-sonnet-20241022',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        })
        return message.content[0]?.type === 'text' ? message.content[0].text : ''
      }

      case 'google': {
        const google = AIProviderFactory.getGoogle()
        const geminiModel = google.getGenerativeModel({ model: model || 'gemini-pro' })
        const result = await geminiModel.generateContent(prompt)
        return result.response.text()
      }

      default:
        throw new Error('Unsupported AI provider')
    }
  } catch (error) {
    console.error('AI generation error:', error)
    throw error
  }
}

// Generate Recipe with AI (Chef feature)
export async function generateRecipe(
  ingredients: string[],
  preferences?: {
    cuisine?: string
    difficulty?: string
    dietary?: string[]
    cookingTime?: number
  },
  provider: 'openai' | 'anthropic' | 'google' = 'openai'
): Promise<any> {
  const prompt = `Generate a detailed recipe using the following ingredients: ${ingredients.join(', ')}.

${preferences?.cuisine ? `Cuisine: ${preferences.cuisine}` : ''}
${preferences?.difficulty ? `Difficulty: ${preferences.difficulty}` : ''}
${preferences?.dietary?.length ? `Dietary restrictions: ${preferences.dietary.join(', ')}` : ''}
${preferences?.cookingTime ? `Max cooking time: ${preferences.cookingTime} minutes` : ''}

Return a JSON object with this exact structure:
{
  "title": "Recipe name",
  "description": "Brief description",
  "prepTime": number (in minutes),
  "cookTime": number (in minutes),
  "servings": number,
  "difficulty": "easy|medium|hard",
  "category": "breakfast|lunch|dinner|dessert|snack",
  "cuisine": "cuisine type",
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": "amount",
      "unit": "measurement unit"
    }
  ],
  "instructions": [
    {
      "step": number,
      "description": "detailed instruction"
    }
  ],
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },
  "tags": ["tag1", "tag2"]
}

Ensure all ingredients from the list are used.`

  try {
    const response = await generateCode(prompt, provider)

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    throw new Error('Could not extract recipe JSON from AI response')
  } catch (error) {
    console.error('Recipe generation error:', error)
    throw error
  }
}

// Chat with AI (for both features)
export async function chatWithAI(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  provider: 'openai' | 'anthropic' | 'google' = 'openai',
  model?: string
): Promise<string> {
  try {
    switch (provider) {
      case 'openai': {
        const openai = AIProviderFactory.getOpenAI()
        const completion = await openai.chat.completions.create({
          model: model || 'gpt-4',
          messages: messages as any,
          temperature: 0.7,
        })
        return completion.choices[0]?.message?.content || ''
      }

      case 'anthropic': {
        const anthropic = AIProviderFactory.getAnthropic()
        const systemMessage = messages.find((m) => m.role === 'system')
        const userMessages = messages.filter((m) => m.role !== 'system')

        const message = await anthropic.messages.create({
          model: model || 'claude-3-5-sonnet-20241022',
          max_tokens: 4096,
          system: systemMessage?.content,
          messages: userMessages.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        })
        return message.content[0]?.type === 'text' ? message.content[0].text : ''
      }

      case 'google': {
        const google = AIProviderFactory.getGoogle()
        const geminiModel = google.getGenerativeModel({ model: model || 'gemini-pro' })
        const chat = geminiModel.startChat({
          history: messages.slice(0, -1).map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
        })
        const lastMessage = messages[messages.length - 1]
        const result = await chat.sendMessage(lastMessage.content)
        return result.response.text()
      }

      default:
        throw new Error('Unsupported AI provider')
    }
  } catch (error) {
    console.error('AI chat error:', error)
    throw error
  }
}
