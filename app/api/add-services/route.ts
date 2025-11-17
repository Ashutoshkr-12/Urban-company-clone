import uploadToCloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface uploadUrl {
    secure_url: string;
}
export async function POST(req: NextRequest){
   try {
     const formData = await req.formData();

     const name = formData.get('name') as string;
     const category = formData.get('category') as string;
     const price = formData.get('price') as number | null;
     const files = [
        formData.get('photo1') as File,
        formData.get('photo2') as File ,
        formData.get('photo3') as File ,
        formData.get('photo4') as File ,
    ].filter(Boolean);
     
 
     if(!name || !category || !price ){
         return NextResponse.json({success:false, error:"Missing fields" },{ status: 400})
     }
     if(!files || files.length === 0){
        return NextResponse.json({
            success: false,
            error: "images are required"
        }, { status: 400})
     }
     const Price = typeof price === 'number' ?  price : Number(price);

     const uploadPromises = files.map(file => uploadToCloudinary(file, "Works"))
     const uploadResults = await Promise.all(uploadPromises) as uploadUrl[];
     const uploadUrls: string[] = uploadResults.map((result: uploadUrl) => result.secure_url)

     const service = await prisma.service.create({
         data: {
             name,
             category,
             price: Price,
             images: uploadUrls,
         } as any
     });
 
     return NextResponse.json({
         success: true,
         message: "Service saved",
         data: service
     }, { status: 200})

   } catch (error) {
    console.error('Error in adding service from server:', error)
    return NextResponse.json({ success: false, error: "Error from server"}, { status: 500})
   }
}


export async function GET() {
  try {
    // 1. Fetch all services
    const services = await prisma.service.findMany({});

    // 2. Add reviewCount to each service
    const servicesWithCount = await Promise.all(
      services.map(async (service) => {
        const reviewCount = await prisma.review.count({
          where: { serviceId: service.id },
        });

        return {
          ...service,
          reviewCount,
        };
      })
    );

    return NextResponse.json(
      { success: true, data: servicesWithCount },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Unable to fetch data" },
      { status: 500 }
    );
  }
}


// export async function GET(){

//     try {
//         const services = await prisma.service.findMany({});
//         return NextResponse.json({success: true, data: services},{ status: 200})
//     } catch (error) {
//         return NextResponse.json({success: false,error: 'unable to fetch data from server'},{ status: 500})
//     }
// }

