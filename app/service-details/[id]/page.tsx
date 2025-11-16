'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(()=> {
    async function load(){
      const res = await fetch(`/api/unique-service${id}`,{
        method: "GET"
      })
      const data = await res.json();
      setService(data)
    }
  },[])
  //console.log('service:',service)
  // Mock service data (in real app, fetch from backend)
  const services = {
    id: Number(id),
    title: "House Deep Cleaning",
    description: "Complete home cleaning with professional equipment and eco-friendly products",
    price: "₹499",
    originalPrice: "₹799",
    duration: "2-3 hours",
    rating: 4.8,
    reviewCount: 1250,
    image: "🏠",
    category: "Cleaning",
    includes: [
      "Living room & bedroom cleaning",
      "Kitchen deep cleaning",
      "Bathroom sanitization",
      "Dusting & vacuuming",
      "Floor mopping",
      "Window cleaning (interior)",
    ],
    workers: [
      { id: 1, name: "Rajesh Kumar", rating: 4.9, experience: "5 years", completedJobs: 450 },
      { id: 2, name: "Priya Sharma", rating: 4.8, experience: "3 years", completedJobs: 320 },
      { id: 3, name: "Amit Patel", rating: 4.7, experience: "4 years", completedJobs: 380 },
    ],
    customerReviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent service! Very thorough cleaning and professional staff.",
      },
      {
        id: 2,
        user: "John D.",
        rating: 4,
        date: "1 week ago",
        comment: "Good service, arrived on time and did a great job.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/services">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{services.image}</div>
                  <div className="flex-1">
                    <Badge className="mb-2">{services.category}</Badge>
                    <CardTitle className="text-3xl mb-2">{services.title}</CardTitle>
                    <CardDescription className="text-base">
                      {services.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-accent text-accent" />
                        <span className="font-bold">{services.rating}</span>
                        <span className="text-muted-foreground">({services.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>{services.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {services.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Available Workers */}
            <Card>
              <CardHeader>
                <CardTitle>Available Professionals</CardTitle>
                <CardDescription>Choose from our verified service providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.workers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{worker.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          {worker.rating}
                        </span>
                        <span>{worker.experience} exp</span>
                        <span>{worker.completedJobs} jobs</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Verified
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.customerReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{review.user}</span>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">{services.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      {services.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-success font-medium">Save 38% today!</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Safe and secure payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>100% satisfaction guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-accent" />
                    <span>On-time service promise</span>
                  </div>
                </div>

                <Link href={`/booking/${services.id}`} className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Book
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
