"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, MapPin } from "lucide-react"

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

// Mock venues data
const venues = [
  {
    id: "1",
    name: "Gachibowli Indoor Stadium",
    city: "Hyderabad",
    address: "Gachibowli, Hyderabad, Telangana 500032",
    capacity: 500,
    events: 12,
    isActive: true,
  },
  {
    id: "2",
    name: "Hitex Exhibition Center",
    city: "Hyderabad",
    address: "Hitex Road, Hyderabad, Telangana 500084",
    capacity: 300,
    events: 8,
    isActive: true,
  },
  {
    id: "3",
    name: "LB Stadium",
    city: "Hyderabad",
    address: "Liberty Rd, Hyderabad, Telangana 500001",
    capacity: 400,
    events: 6,
    isActive: true,
  },
  {
    id: "4",
    name: "Indoor Stadium",
    city: "Chennai",
    address: "Jawaharlal Nehru Stadium, Chennai, Tamil Nadu 600003",
    capacity: 300,
    events: 6,
    isActive: true,
  },
]

// Mock events data
const events = [
  {
    id: "1",
    title: "Baby Crawling",
    city: "Hyderabad",
    venue: "Gachibowli Indoor Stadium",
    date: "2025-10-26",
    registrations: 45,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Baby Walker",
    city: "Hyderabad",
    venue: "Gachibowli Indoor Stadium",
    date: "2025-10-26",
    registrations: 38,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Running Race",
    city: "Hyderabad",
    venue: "Hitex Exhibition Center",
    date: "2025-11-15",
    registrations: 52,
    status: "upcoming",
  },
]

export default function CityDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [city, setCity] = useState<any>(null)
  const [cityVenues, setCityVenues] = useState<any[]>([])
  const [cityEvents, setCityEvents] = useState<any[]>([])

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const cityId = unwrappedParams.id

  useEffect(() => {
    // In a real app, this would be an API call to fetch the city data
    const foundCity = cities.find(c => c.id === cityId)
    if (foundCity) {
      setCity(foundCity)

      // Filter venues for this city
      const filteredVenues = venues.filter(v => v.city === foundCity.name)
      setCityVenues(filteredVenues)

      // Filter events for this city
      const filteredEvents = events.filter(e => e.city === foundCity.name)
      setCityEvents(filteredEvents)
    }
  }, [cityId])

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
            <h1 className="text-3xl font-bold tracking-tight">{city.name}</h1>
            <p className="text-muted-foreground">{city.state}, India</p>
          </div>
        </div>
        <Button onClick={() => router.push(`/admin/cities/${city.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit City
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            {city.isActive ? (
              <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
            ) : (
              <Badge variant="outline">Inactive</Badge>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Venues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.venues}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.events}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Venues in {city.name}</h2>
          <p className="text-muted-foreground">List of venues where NIBOG events are held</p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venue Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cityVenues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No venues found in {city.name}.
                  </TableCell>
                </TableRow>
              ) : (
                cityVenues.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell className="font-medium">{venue.name}</TableCell>
                    <TableCell>{venue.address}</TableCell>
                    <TableCell>{venue.capacity}</TableCell>
                    <TableCell>{venue.events}</TableCell>
                    <TableCell>
                      {venue.isActive ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Upcoming Events in {city.name}</h2>
          <p className="text-muted-foreground">List of upcoming NIBOG events in this city</p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cityEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No upcoming events in {city.name}.
                  </TableCell>
                </TableRow>
              ) : (
                cityEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.venue}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.registrations}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
