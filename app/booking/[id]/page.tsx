'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { redirect, useParams } from "next/navigation";

const Booking = () => {
  const { id } = useParams();
  const [date, setDate] = useState<Date>();
  const [selectedWorker, setSelectedWorker] = useState("1");
  const [selectedTime, setSelectedTime] = useState("10:00");

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    redirect(`/payment/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Book Your Service</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details to schedule your service
          </p>

          <form onSubmit={handleBooking} className="space-y-6">
            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>We'll use this to contact you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </CardContent>
            </Card>

            {/* Service Address */}
            <Card>
              <CardHeader>
                <CardTitle>Service Address</CardTitle>
                <CardDescription>Where should we provide the service?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Flat/House No, Building Name, Street Name"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Mumbai" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" placeholder="Maharashtra" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" placeholder="400001" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose when you want the service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Service Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date: any) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Time Slot *</Label>
                  <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <RadioGroupItem value={time} id={time} />
                          <Label htmlFor={time} className="cursor-pointer">
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Choose Professional */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Professional</CardTitle>
                <CardDescription>Select your preferred service provider</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedWorker} onValueChange={setSelectedWorker}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <RadioGroupItem value="1" id="worker1" />
                        <div>
                          <Label htmlFor="worker1" className="cursor-pointer font-semibold">
                            Rajesh Kumar
                          </Label>
                          <p className="text-sm text-muted-foreground">⭐ 4.9 • 5 years exp</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <RadioGroupItem value="2" id="worker2" />
                        <div>
                          <Label htmlFor="worker2" className="cursor-pointer font-semibold">
                            Priya Sharma
                          </Label>
                          <p className="text-sm text-muted-foreground">⭐ 4.8 • 3 years exp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Instructions</CardTitle>
                <CardDescription>Any special requirements? (Optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Please bring your own cleaning supplies, call before arriving"
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => redirect('/')}>
                Cancel
              </Button>
              <Button type="submit" size="lg">
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
