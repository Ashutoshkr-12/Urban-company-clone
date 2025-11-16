import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: {params: {id: string}}){
    try {

        const { id } = params;

        const service = await prisma.service.findUnique({
            where: { id },
            include: {
                reviews: true,
                bookings: false,
            }
        });

        if(!service){
            return NextResponse.json({
                error: "Service not found",
                success: false
            
            }, { status: 404})
        }
        return NextResponse.json({success: true, data: service},{ status: 200})
    } catch (error) {
        return NextResponse.json({success: false,error: 'unable to fetch data from server'},{ status: 500})
    }
}
