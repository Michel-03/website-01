import { NextResponse } from "next/server";
import {createClient} from "@supabase/supabase-js";

export async function GET(){
    try{
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const {data, error} = await supabase
        .from("job")
        .select("*")
        .order("id", {ascending: false})

        console.log("jobs_available:", data)
        if(error) {
            console.log("Supabase error:", error);
            return NextResponse.json({success:false, data})
        }

        return NextResponse.json({ success: true, data });

    }catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}