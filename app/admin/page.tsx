"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Users,
  Briefcase,
  TrendingUp,
  Edit,
  Trash2,
  ImagePlus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import Image from "next/image";

const Admin = () => {
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Total Bookings", value: "--", icon: Briefcase, trend: "--" },
    { label: "Active Workers", value: "--", icon: Users, trend: "--" },
    { label: "Revenue", value: "--", icon: TrendingUp, trend: "--" },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: "Sarah M.",
      service: "House Cleaning",
      date: "Today, 10:00 AM",
      amount: "₹499",
      status: "confirmed",
    },
    {
      id: 2,
      customer: "John D.",
      service: "AC Repair",
      date: "Today, 2:00 PM",
      amount: "₹349",
      status: "pending",
    },
    {
      id: 3,
      customer: "Anita R.",
      service: "Plumbing",
      date: "Tomorrow, 11:00 AM",
      amount: "₹299",
      status: "confirmed",
    },
  ];

  const handleFileChange = (i: number, file: File | null) => {
    const updateFiles = [...files];
    updateFiles[i] = file;
    setFiles(updateFiles);
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true)
      const formData = new FormData();

      files.forEach((file, i) => {
        if (file) {
          formData.append(`photo${i + 1}`, file);
        }
      });

      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price as any);

      const res = await fetch("/api/add-services", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast("New service created Successfully");
        setName("");
        setCategory("");
        setPrice(undefined);
      } else {
        toast.error("failed to create service");
        console.error(data.error);
      }
      setIsAddWorkerOpen(false);
    } catch (error) {
      console.error("Error in sending data from frontend:", error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your home services business
            </p>
          </div>

          <Dialog open={isAddWorkerOpen} onOpenChange={setIsAddWorkerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Add a new service provided by your team
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workerName">Service Name *</Label>
                  <Input
                    id="workerName"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter service name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workerService">Service Type *</Label>
                  <Input
                    id="workerService"
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Cleaning, Plumbing"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workerExperience">
                    Price of the service{" "}
                  </Label>
                  <Input
                    id="workerExperience"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="number"
                    placeholder="500 inr"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Images of your work </Label>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {[0, 1, 2, 3].map((index) => (
                      <label
                        key={index}
                        htmlFor={`image${index}`}
                        className="cursor-pointer"
                      >
                        <input
                          accept="image/*"
                          type="file"
                          id={`image${index}`}
                          hidden
                          onChange={(e) =>
                            handleFileChange(index, e.target.files?.[0] || null)
                          }
                        />
                        {files[index] ? (
                          <Image
                            className="max-w-24 cursor-pointer"
                            src={URL.createObjectURL(files[index]!)}
                            alt={`photo${index + 1}`}
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                            <ImagePlus size={28} />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

{loading ? <Button type="submit" className="w-full">
                  Adding.....
                </Button> : <Button type="submit" className="w-full">
                  Add Worker
                </Button>}
                
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-success">
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            {/* <TabsTrigger value="workers">Workers</TabsTrigger> */}
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Latest service bookings from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">{booking.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.service}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">{booking.amount}</span>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="workers">
            <Card>
              <CardHeader>
                <CardTitle>Service Providers</CardTitle>
                <CardDescription>Manage your workforce</CardDescription>
              </CardHeader>
              <CardContent>
               
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
