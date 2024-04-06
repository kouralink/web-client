
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { login, setError } from "@/state/auth/authSlice";
import { Loader2 } from "lucide-react";
import AuthWith from "@/components/global/cards/AuthWith";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  // reset auth error state before destroy componenet
  const reset = () => {
    dispatch(setError(null));
  };
  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log(formData);
    dispatch(
      login({
        email: formData.email as string,
        password: formData.password as string,
        rememberMe: formData.rememberme
          ? (formData.rememberme as string)
          : "off",
      })
    );
  };
  if (!authError && authUser) {
    navigate("/");
  }

  return (
    <div className="w-full h-fit flex items-center gap-4 justify-evenly ">
      
      <Card className="w-full aspect-square flex flex-col justify-center">
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
                  <Link to={"/auth/reset-password"}>Forgot password?</Link>
                </div>
              </div>
              <div>
                {authError && <p className="text-red-500">{authError}</p>}
              </div>
              <div className="flex justify-end">
                {authLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">Join</Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-4 [&>*]:w-full">
          <AuthWith />
          <div className="flex justify-center mb-2">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-primary-700">
                Register
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
