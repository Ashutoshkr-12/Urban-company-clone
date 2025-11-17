import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const Home = () => {
  const featuredServices = [
    {
      id: 1,
      title: "House Cleaning",
      description: "Professional deep cleaning services",
      price: "₹499",
      rating: 4.8,
      image: "🏠",
    },
    
    {
      id: 2,
      title: "AC Repair & Service",
      description: "Expert AC maintenance and repair",
      price: "₹349",
      rating: 4.9,
      image: "❄️",
    },
    {
      id: 3,
      title: "Plumbing Services",
      description: "24/7 emergency plumbing support",
      price: "₹299",
      rating: 4.7,
      image: "🔧",
    },
    {
      id: 4,
      title: "Electrical Work",
      description: "Licensed electricians at your service",
      price: "₹399",
      rating: 4.8,
      image: "⚡",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are background checked",
    },
    {
      icon: Clock,
      title: "On-Time Service",
      description: "We value your time with prompt arrivals",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "100% satisfaction or money back",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden  bg-linear-to-tl from-primary via-primary to-[hsl(var(--hero-gradient-end))] text-primary-foreground">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
           
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Home Services at Your Doorstep
            </h1>
            <p className="text-lg md:text-xl mb-8 font-semibold text-primary-foreground/90">
              Book trusted professionals for all your home needs. From cleaning to repairs, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Browse Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-background/10 hover:bg-background/20 border-primary-foreground/20 text-primary-foreground">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
          <p className="text-muted-foreground text-lg">
            Choose from our most requested home services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="text-5xl mb-4">{service.image}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
                <Link href={`/services`}>
                  <Button className="w-full">Checkout</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose HomeMaker?</h2>
            <p className="text-muted-foreground text-lg">
              We make home services simple, reliable, and affordable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <Card className="bg-linear-to-r from-primary to-[hsl(var(--hero-gradient-end))] text-primary-foreground border-0">
          <CardHeader className="text-center py-12">
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg mb-6">
              Book your first service today and experience the difference
            </CardDescription>
            <div className="flex justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Book a Service Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
};

export default Home;
