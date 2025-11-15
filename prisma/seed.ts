import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample user (will be linked with Clerk on first login)
  const sampleUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      clerkId: 'demo_clerk_id',
      email: 'demo@example.com',
      name: 'Demo User',
      username: 'demouser',
    },
  })

  console.log('✅ Sample user created:', sampleUser.email)

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with Next.js and Prisma',
      type: 'web',
      framework: 'Next.js',
      userId: sampleUser.id,
      isPublic: true,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Recipe Finder App',
      description: 'Mobile app for discovering recipes',
      type: 'mobile',
      framework: 'React Native',
      userId: sampleUser.id,
      isPublic: false,
    },
  })

  console.log('✅ Sample projects created')

  // Create sample recipes
  const recipe1 = await prisma.recipe.create({
    data: {
      title: 'Classic Spaghetti Carbonara',
      description: 'Traditional Italian pasta with eggs, cheese, and pancetta',
      userId: sampleUser.id,
      ingredients: [
        { name: 'Spaghetti', quantity: '400', unit: 'g' },
        { name: 'Pancetta', quantity: '200', unit: 'g' },
        { name: 'Eggs', quantity: '4', unit: 'large' },
        { name: 'Parmesan cheese', quantity: '100', unit: 'g' },
        { name: 'Black pepper', quantity: '1', unit: 'tsp' },
      ],
      instructions: [
        { step: 1, description: 'Cook spaghetti in salted boiling water until al dente' },
        { step: 2, description: 'Sauté pancetta until crispy' },
        { step: 3, description: 'Beat eggs with grated Parmesan and pepper' },
        { step: 4, description: 'Drain pasta and mix with pancetta' },
        { step: 5, description: 'Remove from heat and add egg mixture, stirring quickly' },
        { step: 6, description: 'Serve immediately with extra cheese' },
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      difficulty: 'medium',
      category: 'dinner',
      cuisine: 'Italian',
      tags: ['pasta', 'italian', 'quick'],
      isPublic: true,
    },
  })

  const recipe2 = await prisma.recipe.create({
    data: {
      title: 'Chicken Tikka Masala',
      description: 'Aromatic Indian curry with tender chicken in creamy tomato sauce',
      userId: sampleUser.id,
      ingredients: [
        { name: 'Chicken breast', quantity: '500', unit: 'g' },
        { name: 'Yogurt', quantity: '200', unit: 'ml' },
        { name: 'Tomato puree', quantity: '400', unit: 'g' },
        { name: 'Onion', quantity: '1', unit: 'large' },
        { name: 'Garlic', quantity: '4', unit: 'cloves' },
        { name: 'Ginger', quantity: '1', unit: 'inch piece' },
        { name: 'Garam masala', quantity: '2', unit: 'tsp' },
      ],
      instructions: [
        { step: 1, description: 'Marinate chicken in yogurt and spices for 30 minutes' },
        { step: 2, description: 'Sauté onion, garlic, and ginger until fragrant' },
        { step: 3, description: 'Add marinated chicken and cook until browned' },
        { step: 4, description: 'Add tomato puree and simmer for 15 minutes' },
        { step: 5, description: 'Stir in cream and simmer for 5 more minutes' },
        { step: 6, description: 'Serve with rice or naan bread' },
      ],
      prepTime: 30,
      cookTime: 40,
      servings: 4,
      difficulty: 'hard',
      category: 'dinner',
      cuisine: 'Indian',
      tags: ['chicken', 'curry', 'spicy'],
      nutrition: {
        calories: 450,
        protein: 35,
        carbs: 15,
        fat: 28,
      },
      isPublic: true,
    },
  })

  console.log('✅ Sample recipes created')

  console.log('🎉 Database seeded successfully!')
  console.log('📊 Statistics:')
  console.log(`  - Users: 1`)
  console.log(`  - Projects: 2`)
  console.log(`  - Recipes: 2`)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
