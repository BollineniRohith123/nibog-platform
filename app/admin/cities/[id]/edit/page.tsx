"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"

// Mock data - in a real app, this would come from an API
const cities = [
  {
    id: "1",
    name: "Hyderabad",
    state: "Telangana",
    venues: 3,
    events: 12,
    isActive: true,
  },
  {
    id: "2",
    name: "Bangalore",
    state: "Karnataka",
    venues: 2,
    events: 8,
    isActive: true,
  },
  {
    id: "3",
    name: "Chennai",
    state: "Tamil Nadu",
    venues: 2,
    events: 6,
    isActive: true,
  },
  {
    id: "4",
    name: "Vizag",
    state: "Andhra Pradesh",
    venues: 1,
    events: 4,
    isActive: true,
  },
  {
    id: "5",
    name: "Mumbai",
    state: "Maharashtra",
    venues: 2,
    events: 5,
    isActive: true,
  },
  {
    id: "6",
    name: "Delhi",
    state: "Delhi",
    venues: 2,
    events: 6,
    isActive: true,
  },
  {
    id: "7",
    name: "Kolkata",
    state: "West Bengal",
    venues: 1,
    events: 3,
    isActive: true,
  },
  {
    id: "8",
    name: "Pune",
    state: "Maharashtra",
    venues: 1,
    events: 2,
    isActive: true,
  },
  {
    id: "9",
    name: "Patna",
    state: "Bihar",
    venues: 1,
    events: 2,
    isActive: false,
  },
  {
    id: "10",
    name: "Ranchi",
    state: "Jharkhand",
    venues: 1,
    events: 1,
    isActive: false,
  },
]

export default function EditCityPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [city, setCity] = useState<any>(null)
  const [name, setName] = useState("")
  const [state, setState] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const cityId = unwrappedParams.id

  useEffect(() => {
    // In a real app, this would be an API call to fetch the city data
    const foundCity = cities.find(c => c.id === cityId)
    if (foundCity) {
      setCity(foundCity)
      setName(foundCity.name)
      setState(foundCity.state)
      setIsActive(foundCity.isActive)
    }
  }, [cityId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to update the city
    setTimeout(() => {
      // In a real app, this would be an API call to update the city
      setIsLoading(false)
      setIsSaved(true)

      // Reset the saved state after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1000)
  }

  if (!city) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">City not found</h2>
          <p className="text-muted-foreground">The city you are looking for does not exist.</p>
          <Button className="mt-4" onClick={() => router.push("/admin/cities")}>
            Back to Cities
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/cities")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit City</h1>
            <p className="text-muted-foreground">Update city information for NIBOG events</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>City Information</CardTitle>
            <CardDescription>Update the city details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">City Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter city name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state name"
                required
              />
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="active-status">Active Status</Label>
                <p className="text-sm text-muted-foreground">
                  Inactive cities will not be shown on the website
                </p>
              </div>
              <Switch
                id="active-status"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/admin/cities")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                "Saving..."
              ) : isSaved ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>City Statistics</CardTitle>
              <CardDescription>View statistics for this city</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Venues</h3>
                  <p className="mt-2 text-2xl font-bold">{city.venues}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Events</h3>
                  <p className="mt-2 text-2xl font-bold">{city.events}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
