import { NextResponse } from "next/server";
import comData from "./com.json";

export async function GET() {
  return NextResponse.json(comData);
}
