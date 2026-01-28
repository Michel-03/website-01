import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const res =  NextResponse.json({sucess:true})

    res.cookies.set({
        name: "admin_logged_in",
        value: "",
        httpOnly: true,
        path: "/",
        maxAge: 0,
    });
    return res;
}