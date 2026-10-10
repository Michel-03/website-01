import { NextResponse } from "next/server";
import { getLocalAdminCredentials } from "../../../../lib/localAdmin";
import { getSupabase } from "../../../../lib/supabaseclient";

function matchesLocalAdmin(email: string, password: string) {
  const credentials = getLocalAdminCredentials();
  const adminEmail = credentials.email.trim().toLowerCase();
  const adminPassword = credentials.password;

  if (!adminEmail || !adminPassword) return false;

  return email.trim().toLowerCase() === adminEmail && password === adminPassword;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "");
    const password = String(body.password ?? "");

    if (!email.trim() || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    let authenticated = matchesLocalAdmin(email, password);

    if (!authenticated) {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from("admin_users")
          .select("id, email")
          .eq("email", email.trim())
          .eq("password", password)
          .maybeSingle();

        if (error) {
          return NextResponse.json(
            { success: false, error: "The admin database could not be reached." },
            { status: 503 }
          );
        }

        authenticated = Boolean(data);
      } catch {
        const credentials = getLocalAdminCredentials();
        if (!credentials.email || !credentials.password) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Admin login is not connected. Add ADMIN_EMAIL and ADMIN_PASSWORD, or the Supabase admin_users credentials.",
            },
            { status: 503 }
          );
        }
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Create JSON response
    const response = NextResponse.json({
      success: true,
    });

    // Set HttpOnly cookie
    response.cookies.set({
      name: "admin_logged_in",
      value: "true",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}




// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseclient"; // your supabase client

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log(body)
//     const { email, password } = body;

//     // Check admin table
//     const { data, error } = await supabase
//       .from("admin_users")          // <-- your admin table
//       .select("*")
//       .eq("email", email)
//       .eq("password", password)
//       .single();

//     if (error || !data) {
//       return NextResponse.json({
//         success: false,
//         error: "Invalid credentials",
//       });
//     }

//     // return NextResponse.json({
//     //   success: true,
//     //   user: data,
//     // });
//     const response = NextResponse.json({ success: true });

//     response.cookies.set({
//         name: "admin_logged_in",
//         value: "true",
//         httpOnly: true,
//         path: "/",
//         sameSite: "lax",
//         maxAge: 60 * 60 * 24, // 1 day
//     });

//     return response;

//   } catch (err) {
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   }
// }



// // // src/app/api/admin/login/route.ts
// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { supabase } from "@/lib/supabaseclient";

// // export async function POST(req: NextRequest){
// //     try{
// //         const body =  await req.json();
// //         const{email, password} = body;

// //         if(!email || !password){
// //             return NextResponse.json({error: "Missing credentials"}, {status: 400});
// //         }

// //         const {data, error} = await supabase
// //         .from("admin_users")
// //         .select("id,email")
// //         .eq("email", email)
// //         .eq("password", password)
// //         .single();

// //         if (error || !data){
// //             return NextResponse.json({error:"Invalid email or password"}, {status:401});
// //         }

// //          // create HttpOnly cookie to be readable by middleware
// //         const response = NextResponse.json({success:true})

// //         // Set secure attributes: HttpOnly, SameSite=Lax, path=/, set max-age (secs)
// //         response.cookies.set({
// //             name: "admin_logged_in",
// //             value: "true",
// //             httpOnly: true,
// //             path: "/",
// //             sameSite: "lax",
// //             maxAge: 60 * 60 * 24, // 1 day
// //             // secure: true, // enable in production with https
// //         });
// //         return response;

// //     }catch (err) {
// //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// //   }
// // }