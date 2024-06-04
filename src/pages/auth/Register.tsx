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

import SectionTitle from "@/components/global/SectionTitle";

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

// redux state
import { useDispatch, useSelector } from "react-redux";
import { register, setError } from "../../state/auth/authSlice";
import { AppDispatch, RootState } from "../../state/store";
import { Loader2 } from "lucide-react";
import AuthWith from "@/components/global/cards/AuthWith";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(60),
  confPassword: z.string().min(8).max(60),
  rememberme: z.boolean().default(false).optional(),
})
.refine((data) => data.password === data.confPassword, {
  message: "Passwords don't match",
  path: ["confPassword"],
});

type RefisterFormValues = z.infer<typeof registerFormSchema>;

export default function Register() {
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

  const defaultValues: Partial<RefisterFormValues> = {
    rememberme: false,
  };
  const form = useForm<RefisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: RefisterFormValues) => {
    // console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    dispatch(
      register({
        email: data.email,
        password: data.password,
        confPassword: data.confPassword,
        rememberMe: data.rememberme ? "on" : "off",
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
              title="Create an account"
              classesStyle="text-lg  sm:text-1xl md:text-2xl lg:text-3xl"
            />{" "}
          </CardTitle>
          <CardDescription>Welcome to Kouralink</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      This email will be used to login to your account
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
              <FormField
                control={form.control}
                name="confPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter your password again
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" w-full flex flex-col   m-0 p-0 gap-4">
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
                  {authError && <p className="text-red-500">{authError}</p>}
                </div>
                <div className="flex justify-end">
                  {authLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">Create</Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-4 [&>*]:w-full">
          <AuthWith />
          <div className="flex justify-center mb-2">
            <p>
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
