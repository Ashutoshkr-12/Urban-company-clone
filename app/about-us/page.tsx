import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, ThumbsUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All our professionals are thoroughly verified with background checks",
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "On-time service guarantee with professional and punctual staff",
    },
    {
      icon: ThumbsUp,
      title: "Quality Service",
      description: "High-quality work guaranteed or your money back",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "24/7 customer support to address all your concerns",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About HomeMaker</h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to make quality home services accessible, reliable, and hassle-free
            for everyone. With a network of verified professionals, we bring trusted services right
            to your doorstep.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2020, HomeMaker started with a simple idea: connecting homeowners with
                skilled professionals who can help maintain and improve their living spaces. What
                began as a small local service has grown into a trusted platform serving thousands
                of customers across multiple cities.
              </p>
              <p>
                We believe that finding reliable home services shouldn't be stressful. That's why
                we've built a platform that carefully vets every professional, ensures transparent
                pricing, and guarantees quality service. Our commitment is to make your home a
                better place, one service at a time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-primary to-[hsl(var(--hero-gradient-end))] text-primary-foreground border-0">
          <CardContent className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-primary-foreground/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80">Professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/80">Services</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15</div>
                <div className="text-primary-foreground/80">Cities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
