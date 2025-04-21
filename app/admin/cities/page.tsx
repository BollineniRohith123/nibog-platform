"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye, Edit, Trash, AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [citiesList, setCitiesList] = useState(cities)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Handle city deletion
  const handleDeleteCity = (id: string) => {
    setIsDeleting(id)

    // Simulate API call to delete the city
    setTimeout(() => {
      // In a real app, this would be an API call to delete the city
      setCitiesList(citiesList.filter(city => city.id !== id))
      setIsDeleting(null)
    }, 1000)
  }

  // Filter cities based on search
  const filteredCities = citiesList.filter((city) => {
    if (searchQuery) {
      return (
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NIBOG Cities</h1>
          <p className="text-muted-foreground">Manage cities where NIBOG events are held</p>
        </div>
        <Button asChild>
          <Link href="/admin/cities/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New City
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cities..."
              className="h-9 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Venues</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No cities found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>{city.state}</TableCell>
                  <TableCell>{city.venues}</TableCell>
                  <TableCell>{city.events}</TableCell>
                  <TableCell>
                    {city.isActive ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/cities/${city.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/cities/${city.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete City</AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                                <div className="space-y-2">
                                  <div className="font-medium">This action cannot be undone.</div>
                                  <div>
                                    This will permanently delete the city "{city.name}" and all associated data.
                                    {city.venues > 0 || city.events > 0 ? (
                                      <>
                                        This city has {city.venues} venue{city.venues !== 1 ? "s" : ""} and {city.events} event{city.events !== 1 ? "s" : ""}.
                                        Deleting it may affect existing data.
                                      </>
                                    ) : (
                                      "This city has no venues or events."
                                    )}
                                  </div>
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteCity(city.id)}
                              disabled={isDeleting === city.id}
                            >
                              {isDeleting === city.id ? "Deleting..." : "Delete City"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
