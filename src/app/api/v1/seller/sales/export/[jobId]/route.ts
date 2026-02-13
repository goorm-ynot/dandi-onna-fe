import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const { jobId } = await params;

        const response = await serverApiClient.get(`/owner/sales/export/${jobId}`) as { data: any; status: number };
        return NextResponse.json(response.data, {status: response.status});
    } catch (error: any) {
        console.error('Error fetching sales export status:', error);
        return NextResponse.json(
            { message: 'Failed to fetch sales export status', error: error.message || 'Unknown error' },
            { status: error.status || 500 }
        );       
    }
}