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
import { Link, useNavigate } from "react-router-dom";

// redux state 
import { useDispatch, useSelector } from "react-redux";
import { register, setError } from "../../state/auth/authSlice";
import { AppDispatch, RootState } from "../../state/store";
import { Loader2 } from "lucide-react";
import AuthWith from "@/components/global/cards/AuthWith";
import { useEffect } from "react";


export default function Register() {
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  // reset auth error state before destroy componenet
  const reset = () => {
    dispatch(setError(null))
  }
  useEffect(() => {
    return () => {reset()}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    dispatch(register({username:formData.username as string,
      email:formData.email as string, password:formData.password as string,
       confPassword:formData.confPassword as string,rememberMe:formData.rememberme ? formData.rememberme as string: "off",}))
  };

  if(!authError && authUser){
    navigate("/");
  }
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
                {authError && <p className="text-red-500">{authError}</p>}
              </div>
              <div className="flex justify-end">
                { authLoading ? 
                <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>:
                <Button type="submit">Create</Button>
                }
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-4 [&>*]:w-full">
          <AuthWith/>
        <div className="flex justify-center mb-2">
            <p >
              Already have an account?{" "}
              <Link to="/auth" className="text-primary-700">
                Log in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
