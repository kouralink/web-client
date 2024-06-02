import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DateTimePicker } from "@/components/ui/datetime-picker";

// Corrected regular expression to match Google Maps location links
const googleMapsLinkRegex =
  /^https:\/\/(www\.)?google\.com\/maps\/place\/[^/]+\/@[0-9.-]+,[0-9.-]+,?[0-9]*z\/data=.*$/;

// Create the Zod schema
const matchDetailsFormSchema = z.object({
  startin: z.date().refine((date) => date > new Date(), {
    message: "Start date must be in the future",
  }),
  location: z.string().regex(googleMapsLinkRegex, {
    message: "Invalid Google Maps location link",
  }),
  refree_id: z.string(),
});

type MatchDetailsFormValues = z.infer<typeof matchDetailsFormSchema>;

// This can come from your database or API.

export function MatchDetailsForm() {
  //   const dispatch = useDispatch<AppDispatch>();
  const defaultValues: Partial<MatchDetailsFormValues> = {
    // get default value from authUser state
  };

  const form = useForm<MatchDetailsFormValues>({
    resolver: zodResolver(matchDetailsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: MatchDetailsFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card className="w-full flex flex-col h-full gap-2">
      <CardHeader>
        <CardTitle>Match Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          Required info of match
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          control={form.control}
          name="startin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="datetime">Date time</FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity="second"
                  jsDate={field.value}
                  onJsDateChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location" {...field} />
                  </FormControl>
                  <FormDescription>
                    This the google map location that the team will play at.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="refree_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refree</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the refree" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="123">someone</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This the refree who will set the match result.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>{/* TODO:Location map here */}</p>
      </CardFooter>
    </Card>
  );
}
