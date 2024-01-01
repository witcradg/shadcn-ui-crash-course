"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string
}

// json-server --watch ./_data/db.json --port 4000
async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')
  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes()
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {/* card component first look https://youtu.be/sXrwh4I229Q?t=202 */}
        {recipes.map((recipe) => {
          return (
            <Card key={recipe.id} className="flex flex-col justify-between">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src={`/img/${recipe.image}`} alt={recipe.title} />
                  <AvatarFallback>
                    {recipe.title.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>{recipe.time} mins to cook.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipe.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>View Recipe</Button>
                {recipe.vegan && <Badge variant='secondary'>Vegan!</Badge>}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
