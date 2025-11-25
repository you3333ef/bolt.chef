'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Code, Globe, Calendar, Folder } from 'lucide-react'

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with Next.js',
      type: 'web',
      framework: 'Next.js',
      updatedAt: new Date(),
      fileCount: 45,
      deploymentCount: 3,
    },
    {
      id: '2',
      name: 'Mobile Recipe App',
      description: 'React Native app for recipe discovery',
      type: 'mobile',
      framework: 'React Native',
      updatedAt: new Date(),
      fileCount: 32,
      deploymentCount: 1,
    },
  ])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Your Projects
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              AI-powered development projects
            </p>
          </div>
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <span className="badge-primary">{project.framework}</span>
                </div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Folder className="w-4 h-4" />
                    <span>{project.fileCount} files</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{project.deploymentCount} deploys</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/projects/${project.id}`}>
                    <Button size="sm" variant="outline">
                      Open
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
