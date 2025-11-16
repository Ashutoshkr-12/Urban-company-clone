'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";


const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");

  
  const categories = [
    { id: "cleaning", name: "Cleaning", count: 12 },
    { id: "repair", name: "Repair & Maintenance", count: 18 },
    { id: "beauty", name: "Beauty & Wellness", count: 8 },
    { id: "appliance", name: "Appliance Service", count: 15 },
  ];

  const services = [
    {
      id: 1,
      title: "House Deep Cleaning",
      category: "cleaning",
      description: "Complete home cleaning with professional equipment",
      price: "₹499",
      duration: "2-3 hours",
      rating: 4.8,
      reviews: 1250,
      image: "🏠",
    },
    {
      id: 2,
      title: "AC Repair & Service",
      category: "appliance",
      description: "AC installation, repair, and maintenance",
      price: "₹349",
      duration: "1-2 hours",
      rating: 4.9,
      reviews: 980,
      image: "❄️",
    },
    {
      id: 3,
      title: "Bathroom Cleaning",
      category: "cleaning",
      description: "Deep cleaning of bathroom and sanitization",
      price: "₹299",
      duration: "1 hour",
      rating: 4.7,
      reviews: 850,
      image: "🚿",
    },
    {
      id: 4,
      title: "Plumbing Services",
      category: "repair",
      description: "Leakage repair, pipe fitting, and installations",
      price: "₹299",
      duration: "1-2 hours",
      rating: 4.7,
      reviews: 720,
      image: "🔧",
    },
    {
      id: 5,
      title: "Electrical Work",
      category: "repair",
      description: "Wiring, switch/socket repair, and installations",
      price: "₹399",
      duration: "1-3 hours",
      rating: 4.8,
      reviews: 640,
      image: "⚡",
    },
    {
      id: 6,
      title: "Salon at Home",
      category: "beauty",
      description: "Professional hair, makeup, and beauty services",
      price: "₹599",
      duration: "1-2 hours",
      rating: 4.9,
      reviews: 1100,
      image: "💇",
    },
    {
      id: 7,
      title: "Washing Machine Repair",
      category: "appliance",
      description: "All brands washing machine repair and service",
      price: "₹349",
      duration: "1-2 hours",
      rating: 4.6,
      reviews: 530,
      image: "🧺",
    },
    {
      id: 8,
      title: "Pest Control",
      category: "cleaning",
      description: "Effective pest control for homes",
      price: "₹799",
      duration: "2-3 hours",
      rating: 4.8,
      reviews: 890,
      image: "🐛",
    },
  ];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Services</h1>
          <p className="text-muted-foreground text-lg">
            Browse through our wide range of home services
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">{service.image}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {service.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({service.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    ⏱️ {service.duration}
                  </div>
                  
                  <Link href={`/services/${service.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
