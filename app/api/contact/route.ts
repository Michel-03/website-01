import { NextResponse } from "next/server"; //to send the reply to the request
import { createClient } from "@supabase/supabase-js"; //to establish a connection

export async function POST(req:Request){
    try{
        const body = await req.json()

        //creating a  connection to the server or db
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const {data, error} = await supabase
        .from("contact_form")
        .insert({
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            phone: body.phone,
            message: body.message,
        })
        .select("*");

        if (error) {
            console.log(error);
            return NextResponse.json({ success: false, error})
        }
        console.log("DATA:", data)
        console.log("Error:", error)
        return NextResponse.json({success: true})
    }catch(e){
        return NextResponse.json({success:false, error:e})
    }
}