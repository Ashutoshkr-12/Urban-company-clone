'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, ArrowLeft, CheckCircle2, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface reviewUser {
  fullName: string;
}
interface Review {
  id: string;
  user: reviewUser | null;
  rating: number;
  comment: string;
  createdAt: string
}
interface Service {
  id: string;
  name : string;
  category: string;
  price: number;
  images: string[];
  reviews: Review[];
}

const ServiceDetail = () => {
  const { id } = useParams();
  //console.log('id:',id)
  const [service, setService] = useState< Service >();
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");



const loadService = async () => {
  const res = await fetch("/api/unique-services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  });
  const data = await res.json();
  setService(data.data);
};

useEffect(() => {
  loadService();
}, [id]);

 
const handleReviewSubmit = async (e: any) => {
  e.preventDefault();

  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      serviceId: id,
      rating,
      comment
    })
  });
  const data = await res.json();
  if (data.success) {
    // close dialog
    setIsAddWorkerOpen(false);
    loadService();  
    // reset fields
    setRating(5);
    setComment("");
  } else {
    console.error("Review error:", data.error);
  }
};


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
                <div className=" md:flex md:items-start  gap-4">
                    <div className="mb-2">
   <Carousel className="w-64 md:w-96 max-w-xl mx-auto">
  <CarouselContent>
    {service?.images?.map((img, index) => (
      <CarouselItem key={index}>
        <img
          src={img}
          alt={`service-image-${index}`}
          className="w-full h-64 object-cover md:object-fit rounded-xl"
        />
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
                </div>
                  <div className="">
                    <Badge className="mb-2">{service?.category}</Badge>
                    <CardTitle className="text-3xl mb-2">{service?.name}</CardTitle>
                    {/* <CardDescription className="text-base">
                      {services.description}
                    </CardDescription> */}
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-accent text-accent" />
                        <span className="font-bold"></span>
                        <span className="text-muted-foreground">{service?.reviews.length} reviews</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>2-3 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* What's Included */}
            {/* <Card>
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
            </Card> */}

            {/* Reviews */}
            <Card>
              <CardHeader>
                
                <CardTitle>
                  <div className="w-full flex justify-between">
                    <span>Customer Reviews</span>
                    <Dialog open={isAddWorkerOpen} onOpenChange={setIsAddWorkerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                write a review
              </Button>
            </DialogTrigger>
            <DialogContent>
  <DialogHeader>
    <DialogTitle>Write a Review</DialogTitle>
    <DialogDescription>
      Share your experience with this service.
    </DialogDescription>
  </DialogHeader>

  <form onSubmit={handleReviewSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label>Rating *</Label>
      <Input
        type="number"
        min="1"
        max="5"
        required
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
    </div>

    <div className="space-y-2">
      <Label>Comment (optional)</Label>
      <Input
        type="text"
        placeholder="Write your feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>

    <Button type="submit" className="w-full">
      Submit Review
    </Button>
  </form>
</DialogContent>

          </Dialog>
                  </div>
                </CardTitle>
                
              </CardHeader>
            <CardContent className="space-y-4">
  {service?.reviews.map((review) => (
    <div key={review.id} className="border-b pb-4 last:border-0">
      <div className="flex items-center justify-between mb-2">
        
        {/* USER NAME */}
        <span className="font-semibold">
          {review.user?.fullName || "Anonymous"}
        </span>

        {/* DATE */}
        <span className="text-sm text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* STARS */}
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 bg-yellow-400 fill-accent text-accent"
          />
        ))}
      </div>

      {/* COMMENT */}
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
                    <span className="text-3xl font-bold text-primary">{service?.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      {service?.price! * 1.4}
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

                <Link href={`/booking/${service?.id}`} className="block">
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
