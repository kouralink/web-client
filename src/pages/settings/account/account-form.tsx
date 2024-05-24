import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/state/auth/authSlice";
import { Timestamp } from "firebase/firestore";
import { UserUpdate } from "@/types/types";
import { useEffect } from "react";

const accountFormSchema = z.object({
  firstname: z
    .string()
    .min(4, {
      message: "First Name must be at least 4 characters.",
    })
    .max(30, {
      message: "First Name must not be longer than 30 characters.",
    }),
  lastname: z
    .string()
    .min(4, {
      message: "Last Name must be at least 4 characters.",
    })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const authError = useSelector((state: RootState) => state.auth.error);
  const defaultValues: Partial<AccountFormValues> = {
    firstname: authUser?.firstName,
    lastname: authUser?.lastName,
    dob: authUser?.birthday ? new Date(authUser.birthday.toDate()) : undefined,
  };
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isLoading && authError) {
      toast({
        title: "Error",
        description: authError || "An error occurred",
        variant: "destructive",
      });
    }
  }, [isLoading, authError]);

  const onSubmit = async (data: AccountFormValues) => {
    const changedInfos: UserUpdate = {};
    if (authUser?.firstName !== data.firstname) {
      changedInfos.firstName = data.firstname;
    }
    if (authUser?.lastName !== data.lastname) {
      changedInfos.lastName = data.lastname;
    }
    if (authUser?.birthday !== Timestamp.fromDate(data.dob)) {
      changedInfos.birthday = Timestamp.fromDate(data.dob);
    }

    console.log(changedInfos);
    if (Object.keys(changedInfos).length === 0) {
      toast({
        title: "No changes",
        description: "You haven't made any changes.",
      });
      return;
    }

    await dispatch(updateUserData(changedInfos));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Your First Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the First Name that will be displayed on your profile
                and in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Last Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the Last Name that will be displayed on your profile and
                in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
