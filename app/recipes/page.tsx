'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Clock, Users, Heart, MessageCircle, ChefHat } from 'lucide-react'

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [recipes] = useState([
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with creamy egg sauce',
      category: 'dinner',
      cuisine: 'Italian',
      prepTime: 15,
      cookTime: 20,
      difficulty: 'medium',
      images: ['/images/recipe-placeholder.jpg'],
      likes: 245,
      comments: 32,
      author: {
        name: 'Chef Mario',
        avatar: '/images/avatar-placeholder.jpg',
      },
    },
    {
      id: '2',
      title: 'Chicken Tikka Masala',
      description: 'Aromatic Indian curry with tender chicken pieces',
      category: 'dinner',
      cuisine: 'Indian',
      prepTime: 30,
      cookTime: 40,
      difficulty: 'hard',
      images: ['/images/recipe-placeholder.jpg'],
      likes: 189,
      comments: 28,
      author: {
        name: 'Chef Priya',
        avatar: '/images/avatar-placeholder.jpg',
      },
    },
    {
      id: '3',
      title: 'Chocolate Chip Cookies',
      description: 'Soft and chewy homemade cookies',
      category: 'dessert',
      cuisine: 'American',
      prepTime: 20,
      cookTime: 12,
      difficulty: 'easy',
      images: ['/images/recipe-placeholder.jpg'],
      likes: 312,
      comments: 45,
      author: {
        name: 'Chef Emma',
        avatar: '/images/avatar-placeholder.jpg',
      },
    },
  ])

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Discover Recipes
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              AI-generated and community-shared recipes
            </p>
          </div>
          <Button variant="secondary">
            <Plus className="w-5 h-5 mr-2" />
            Create Recipe
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'].map((category) => (
            <button
              key={category}
              className="badge-accent whitespace-nowrap hover:scale-105 transition-transform cursor-pointer"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} hover>
              {/* Recipe Image */}
              <div className="relative h-48 bg-neutral-200 dark:bg-neutral-700 rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-neutral-400" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="badge-secondary capitalize">{recipe.difficulty}</span>
                </div>
              </div>

              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {/* Recipe Info */}
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime + recipe.cookTime} min</span>
                  </div>
                  <span className="badge-primary text-xs">{recipe.cuisine}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {recipe.author.name}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{recipe.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{recipe.comments}</span>
                    </div>
                  </div>
                  <Link href={`/recipes/${recipe.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
