'use client'
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet, Building2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";



const Payment = () => {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const orderSummary = {
    serviceName: "House Deep Cleaning",
    price: 499,
    tax: 90,
    discount: 100,
  };

  const total = orderSummary.price + orderSummary.tax - orderSummary.discount;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment Successful!")
    setTimeout(() => {
      redirect("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground mb-8">
            Complete your booking by making payment
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5" />
                        <Label htmlFor="card" className="cursor-pointer flex-1">
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Wallet className="h-5 w-5" />
                        <Label htmlFor="upi" className="cursor-pointer flex-1">
                          UPI Payment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Building2 className="h-5 w-5" />
                        <Label htmlFor="netbanking" className="cursor-pointer flex-1">
                          Net Banking
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <form onSubmit={handlePayment}>
                {paymentMethod === "card" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Details</CardTitle>
                      <CardDescription>Enter your card information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "upi" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>UPI Details</CardTitle>
                      <CardDescription>Enter your UPI ID</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID *</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "netbanking" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Bank</CardTitle>
                      <CardDescription>Choose your bank</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup>
                        <div className="space-y-2">
                          {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Other Banks"].map((bank) => (
                            <div key={bank} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value={bank.toLowerCase()} id={bank.toLowerCase()} />
                              <Label htmlFor={bank.toLowerCase()} className="cursor-pointer flex-1">
                                {bank}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                )}

                <Button type="submit" size="lg" className="w-full">
                  Pay ₹{total}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{orderSummary.serviceName}</h4>
                    <p className="text-sm text-muted-foreground">Service ID: #{id}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Service Price</span>
                      <span>₹{orderSummary.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax & Fees</span>
                      <span>₹{orderSummary.tax}</span>
                    </div>
                    <div className="flex justify-between text-sm text-success">
                      <span>Discount</span>
                      <span>-₹{orderSummary.discount}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{total}</span>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>100% secure payment</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>Instant booking confirmation</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>Easy cancellation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
