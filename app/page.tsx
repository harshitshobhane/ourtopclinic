import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getRole } from "@/utils/roles";
import { redirect } from "next/navigation";


export default async function Home() {
  const { userId } = await auth();
  const role = await getRole();

  if (userId && role) {
    redirect(`/${role}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white/80 backdrop-blur-md fixed top-0 left-0 z-30">
        <div className="text-2xl font-bold text-emerald-700 tracking-tight">Our Top Clinic</div>
       
        <div>
          {userId ? <UserButton afterSignOutUrl="/" /> : null}
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center pt-24 pb-12 w-full">
        {/* Hero Section */}
        <section className="w-full max-w-3xl mx-auto text-center mb-8 px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-emerald-100 p-3 mb-2">
              {/* Simple placeholder icon */}
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-emerald-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.663-5.33-4-8-4z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to <span className="text-emerald-700">Our Top Clinic</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              A simple, secure platform for <span className="font-semibold text-emerald-700">patients</span> and <span className="font-semibold text-emerald-700">doctors</span> to connect, manage appointments, and collaborate for better health.
            </p>
          </div>
        </section>
        {/* CTA for already registered users */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-0">
          {userId ? (
            <>

              <Link href={`/${role}`}>
                <Button
                  variant="outline"
                  className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                >
                  Continue to Portal
                </Button>
              </Link>
              </>
          ):(
            <>             
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full border-t bg-white/80 py-6 text-center text-gray-500 text-sm mt-auto" id="contact">
        &copy; 2025 Our Top Clinic. All rights reserved. | <Link href="#" className="hover:underline">Privacy Policy</Link> | <Link href="#" className="hover:underline">Contact</Link>
      </footer>
    </div>
  );
}