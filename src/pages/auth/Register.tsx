import SectionTitle from "@/components/global/SectionTitle";
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

export default function Register() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="w-full h-fit flex items-center gap-4 justify-evenly mt-[100px]">
      <div className=" h-full ">
        <img src={Image} alt="singin" />
      </div>
      <Card className="w-[400px] aspect-square flex flex-col justify-center">
        <CardHeader>
          <CardTitle>
            <SectionTitle
              title="Create an account"
              classesStyle="text-lg  sm:text-1xl md:text-2xl lg:text-3xl"
            />{" "}
          </CardTitle>
          <CardDescription>Welcome to Kouralink</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="ba kbour"
                  required
                />
              </div>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confPassword">Confirme Password</Label>
                <Input
                  type="password"
                  id="confPassword"
                  name="confPassword"
                  placeholder="Confirme Password"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Create</Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full">
        <div className="flex justify-center mb-2">
            <p >
              Already have an account?{" "}
              <Link to="/login" className="text-primary-700">
                Log in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
