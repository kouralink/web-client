import Image from "/src/assets/singin.png";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import Facebook from "/src/assets/social/facebook.png";
import Google from "/src/assets/social/google.png";
import SectionTitle from "@/components/global/SectionTitle";

export default function Login() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
    };
  return (
    <div className="w-full h-fit flex items-center gap-4 justify-evenly mt-[100px]">
      <div>
        <img src={Image} alt="singin" />
      </div>
      <Card className="w-[400px] aspect-square flex flex-col justify-center">
        <CardHeader>
          <CardTitle>
          <SectionTitle
              title="Sing in to Kouralink"
              classesStyle="text-lg  sm:text-1xl md:text-2xl lg:text-3xl"
            />{" "}
           </CardTitle>
          <CardDescription>Create your hestory in one-click.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className=" w-full flex flex-row items-center justify-between  m-0 p-0 gap-4">
                <div className="flex flex-row gap-2 ">
                  <input
                    type="checkbox"
                    id="rememberme"
                    name="rememberme"
                    className="rounded-lg"
                  />
                  <Label htmlFor="rememberme">Remember me</Label>
                </div>
                <div>
                  <Link to={'/reset-password'}>Forgot password?</Link>
                </div>
              </div>
            <div className="flex justify-end">
          <Button type="submit">Join</Button>
        </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-4 [&>*]:w-full">
          <div className="">
            <div className="flex gap-6 items-center">
              <div className="h-[.1rem] bg-gray-200 w-full before:contents"></div>
              <div className="w-full">or login with</div>
              <div className="h-[.1rem] bg-gray-200 w-full before:contents"></div>
            </div>
          </div>
          <div className="w-full flex gap-2 items-center justify-center ">
            <Button
              variant={"outline"}
              className="bg-white flex gap-2 rounded-lg border-none shadow-lg "
            >
              <img src={Google} className="w-4 h-4 rounded-full" alt="google" />{" "}
              Google
            </Button>
            <Button
              variant={"outline"}
              className="bg-white flex gap-2 rounded-lg border-none shadow-lg"
            >
              <img
                src={Facebook}
                className="w-4 h-4 rounded-full"
                alt="facebook"
              />{" "}
              Facebook
            </Button>
          </div>
          <div className="flex justify-center mb-2">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-700">
                Register
              </Link>
            </p>
          </div>
        </CardFooter>

      </Card>
    </div>
  );
}
