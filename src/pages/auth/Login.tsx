import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Link, useNavigate } from "react-router-dom";

import SectionTitle from "@/components/global/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { login, setError } from "@/state/auth/authSlice";
import { Loader2 } from "lucide-react";
import AuthWith from "@/components/global/cards/AuthWith";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(60),
  rememberme: z.boolean().default(false).optional(),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const defaultValues: Partial<LoginFormValues> = {
    rememberme: false,
  };
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: "onChange",
  });
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

  const onSubmit = async (data: LoginFormValues) => {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    dispatch(
      login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberme ? "on" : "off",
      })
    );
  };
  if (!authError && authUser) {
    navigate("/");
  }

  return (
    <div className="w-full h-fit max-w-[700px] flex items-center gap-4 justify-evenly overflow-y-scroll p-4">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        This the email you used to register.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your password. Make sure it's secure.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" w-full flex flex-col items-center justify-between  m-0 p-0 gap-4">
                  <div className="flex flex-row w-full items-center justify-between">

                  <FormField
                    control={form.control}
                    name="rememberme"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          Remember me
                          <FormDescription></FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div>
                    <Link to={"/auth/reset-password"}>Forgot password?</Link>
                  </div>
                  </div>

                  <div className="w-full">
                    {authError && <p className="text-red-500">{authError}</p>}
                  </div>
                  <div className="flex w-full justify-end">
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
              </div>
            </form>
          </Form>
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
