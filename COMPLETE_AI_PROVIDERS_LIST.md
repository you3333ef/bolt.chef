# 🤖 Complete AI Providers List - Bolt Chef

Based on comprehensive research of bolt.diy, here are all 23 AI providers supported:

## Cloud Providers (18)

### 1. OpenAI ✅
- **Models**: GPT-4, GPT-4-turbo, GPT-4o, GPT-4o-mini, GPT-3.5-turbo
- **Website**: https://platform.openai.com
- **API Key**: OPENAI_API_KEY

### 2. Anthropic ✅
- **Models**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku, Claude 3 Sonnet
- **Website**: https://console.anthropic.com
- **API Key**: ANTHROPIC_API_KEY

### 3. Google AI ✅
- **Models**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini Pro, Gemini Pro Vision
- **Website**: https://ai.google.dev
- **API Key**: GOOGLE_AI_API_KEY

### 4. Groq ✅
- **Models**: Mixtral-8x7b, Llama2-70b, Gemma-7b, Llama-3.1-70b
- **Website**: https://groq.com
- **API Key**: GROQ_API_KEY

### 5. Mistral AI ✅
- **Models**: Mistral Medium, Mistral Small, Mixtral 8x7B, Mistral 7B
- **Website**: https://mistral.ai
- **API Key**: MISTRAL_API_KEY

### 6. Cohere ✅
- **Models**: Command R, Command R+, Command, Command Nightly
- **Website**: https://cohere.ai
- **API Key**: COHERE_API_KEY

### 7. Together AI ✅
- **Models**: Llama-2-70b, Mixtral 8x7B, Hermes-2-Mixtral-8x7B-DPO
- **Website**: https://together.xyz
- **API Key**: TOGETHER_API_KEY

### 8. Perplexity ✅
- **Models**: Llama-3-Sonar-Small-128k, Llama-3-Sonar-Large-128k, Llama-3.1-Sonar
- **Website**: https://perplexity.ai
- **API Key**: PERPLEXITY_API_KEY

### 9. Hugging Face ✅
- **Models**: DialoGPT-large, BlenderBot-400M, Llama-2-70b-hf
- **Website**: https://huggingface.co
- **API Key**: HUGGINGFACE_API_KEY

### 10. OpenRouter ✅
- **Models**: OpenAI GPT-4, Anthropic Claude, Meta Llama, Google Gemini
- **Website**: https://openrouter.ai
- **API Key**: OPENROUTER_API_KEY

### 11. Moonshot/Kimi ✅
- **Models**: Moonshot-v1-8k, Moonshot-v1-32k, Moonshot-v1-128k
- **Website**: https://platform.moonshot.cn
- **API Key**: MOONSHOT_API_KEY or KIMI_API_KEY

### 12. Hyperbolic ✅
- **Models**: Llama-2-70b-chat-hf, Mixtral-8x7B
- **Website**: https://hyperbolic.xyz
- **API Key**: HYPERBOLIC_API_KEY

### 13. xAI (Grok) ✅
- **Models**: Grok-beta, Grok-vision-beta, Grok-2
- **Website**: https://x.ai
- **API Key**: XAI_API_KEY

### 14. DeepSeek ✅
- **Models**: DeepSeek-Chat, DeepSeek-Coder, DeepSeek-Reasoner
- **Website**: https://platform.deepseek.com
- **API Key**: DEEPSEEK_API_KEY

### 15. GitHub Models ✅
- **Models**: GPT-4, Claude-3-Sonnet, Llama-3-70b, GPT-3.5-turbo
- **Website**: https://github.com/marketplace/models
- **API Key**: GITHUB_MODELS_API_KEY

### 16. Novita AI ✅
- **Models**: Llama-2-70b-chat-hf, Mixtral-8x7B-Instruct
- **Website**: https://novita.ai
- **API Key**: NOVITA_API_KEY

### 17. AI21 (Jurassic) ✅
- **Models**: J1-large, J1-grande, J2-large, J2-grande
- **Website**: https://www.ai21.com
- **API Key**: AI21_API_KEY

### 18. Replicate ✅
- **Models**: Custom model versions, Llama-3-8B-instruct
- **Website**: https://replicate.com
- **API Key**: REPLICATE_API_KEY

### 19. Fireworks AI ✅
- **Models**: Llama-v2-70b-chat, Mixtral-8x7b-instruct
- **Website**: https://fireworks.ai
- **API Key**: FIREWORKS_API_KEY

## Local Providers (2)

### 20. Ollama ✅
- **Models**: Llama2, CodeLlama, Mistral, Phi3, Qwen, Falcon, WizardLM
- **URL**: http://localhost:11434
- **API Key**: Optional

### 21. LM Studio ✅
- **Models**: Local models, GGML, GGUF
- **URL**: http://localhost:1234
- **API Key**: lm-studio (default)

## Enterprise (1)

### 22. AWS Bedrock ✅
- **Models**: Claude-v2, Claude-instant-v1, Claude-3-Sonnet, Claude-3-Haiku
- **Website**: https://aws.amazon.com/bedrock
- **API Keys**: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

## Additional (1)

### 23. Together VLLM ✅
- **Models**: Hermes-2-Mixtral-8x7B-DPO
- **URL**: Configurable (default: https://api.together.xyz)
- **API Key**: TOGETHER_API_KEY

---

## Total: 23 AI Providers ✅

All integrated with:
- ✅ Production-ready code
- ✅ Error handling
- ✅ Async support
- ✅ Multiple models per provider
- ✅ Environment configuration
- ✅ API documentation

## Configuration Example

```bash
# Add to .env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
# ... add any provider you want to use

# For local providers
OLLAMA_URL=http://localhost:11434
LMSTUDIO_URL=http://localhost:1234
```

## Usage Example

```typescript
import { AIProviderFactory } from '@/lib/ai'

// Generate with any provider
const result = await AIProviderFactory.generateWithProvider(
  'Write a React component',
  'openai',
  'gpt-4'
)

// Or generate recipe
const recipe = await generateRecipe(
  ['chicken', 'rice', 'spices'],
  { cuisine: 'indian' },
  'anthropic' // Use Anthropic for recipes
)
```

---

**Status**: ✅ Complete - All bolt.diy providers integrated
**Version**: 1.0.0
**Updated**: 2024-11-15
