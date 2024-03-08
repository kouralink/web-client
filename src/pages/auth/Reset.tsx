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

import SectionTitle from "@/components/global/SectionTitle";
import AuthWith from "@/components/global/cards/AuthWith";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { reset_password } from "@/state/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Reset() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(reset_password({ email: formData.email as string }));    
    
  };
  useEffect(() => {
    if(!authLoading && authError ){
    toast({
        description: authError === "reset with no error"
        ?  "Reset password message has been sent." : authError
        ,
        classesStyle:authError === "no error" ? "":"bg-red-500 text-white" 
      });}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);


  if (!authError && !authLoading && authUser ) {
    navigate("/");
  }
  return (
    <div className="w-full h-fit flex items-center gap-4 justify-evenly mt-[100px]">
      <div className="flex items-end justify-start">
        <img src={Image} alt="singin" />
      </div>
      <Card className="w-[400px] aspect-square flex flex-col justify-center">
        <CardHeader>
          <CardTitle>
            <SectionTitle
              title="Reset Password"
              classesStyle="text-lg  sm:text-1xl md:text-2xl lg:text-3xl"
            />{" "}
          </CardTitle>
          <CardDescription>
            Are you Crazy ? don't forget it again!.
          </CardDescription>
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
              <div className="flex justify-end">
                {authLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">Reset Password</Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-4 [&>*]:w-full">
          <AuthWith />
          <div className="flex justify-center ">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-700">
                Register
              </Link>
            </p>
          </div>
          <div className="flex justify-center ">
            <p>
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
