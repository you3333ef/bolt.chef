'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { ArrowLeft, Clock, Users, Heart, MessageCircle, ChefHat } from 'lucide-react'
import Link from 'next/link'

export default function RecipeDetailPage() {
  const params = useParams()
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    if (params.id) {
      fetchRecipe(params.id as string)
      fetchComments(params.id as string)
    }
  }, [params.id])

  const fetchRecipe = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes/${id}`)
      if (response.ok) {
        const data = await response.json()
        setRecipe(data)
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes/${id}/comment`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const toggleLike = async () => {
    try {
      const response = await fetch(`/api/recipes/${params.id}/like`, {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        // Refresh recipe to get updated like count
        fetchRecipe(params.id as string)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    try {
      const response = await fetch(`/api/recipes/${params.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText }),
      })
      if (response.ok) {
        setCommentText('')
        fetchComments(params.id as string)
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Recipe not found</h1>
          <Link href="/recipes">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Recipes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div className="container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/recipes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{recipe.title}</CardTitle>
                    {recipe.description && (
                      <CardDescription className="text-base">{recipe.description}</CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={toggleLike} variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-1" />
                      {recipe._count?.likes || 0}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Recipe Image Placeholder */}
                <div className="relative h-64 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ChefHat className="w-20 h-20 text-neutral-400" />
                  </div>
                </div>

                {/* Recipe Meta */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neutral-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{totalTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-neutral-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{recipe.servings} servings</span>
                  </div>
                  <span className="badge-secondary">{recipe.difficulty}</span>
                  <span className="badge-primary">{recipe.cuisine}</span>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients?.map((ingredient: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-600 mt-2"></span>
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {recipe.instructions?.map((instruction: any, index: number) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                          {instruction.step}
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 pt-1">{instruction.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Comments ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Comment Form */}
                <form onSubmit={submitComment} className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button type="submit">Post</Button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {comment.user?.name || 'Anonymous'}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 ml-10">{comment.content}</p>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-10 mt-4 space-y-2">
                          {comment.replies.map((reply: any) => (
                            <div key={reply.id} className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                  {reply.user?.name}
                                </span>
                              </div>
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author */}
            <Card>
              <CardHeader>
                <CardTitle>Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{recipe.user?.name}</p>
                    <p className="text-sm text-neutral-500">@{recipe.user?.username}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition */}
            {recipe.nutrition && (
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Calories</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{recipe.nutrition.calories}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Protein</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{recipe.nutrition.protein}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Carbs</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{recipe.nutrition.carbs}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Fat</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{recipe.nutrition.fat}g</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag: string) => (
                      <span key={tag} className="badge-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
