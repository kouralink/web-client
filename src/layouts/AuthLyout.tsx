import { Link, Outlet } from "react-router-dom"
import Navbar from "@/components/global/Navbar"


export default function AuthLayout() {
  return (
    <>
      <div>
         <Navbar />
       </div>
      <div className="container relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r ">
          {/* bg iamge url */}
          <div className="absolute inset-0 bg-primary-950 bg-cover bg-no-repeat bg-center "  style={{
            backgroundImage: "url('/bg.png')"
          }}/>
          <div className="absolute inset-0 backdrop-brightness-50 "/>
          <div className="relative z-20 flex items-center text-lg font-medium ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Koulink Inc
          </div>
          <div className="relative z-20 mt-auto ">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Find and Play with other people, create your own team dive into Football world just amazing.&rdquo;
              </p>
              <footer className="text-sm">Whybe Yassine</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 mt-0 pt-0 ">
            <Outlet/>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


