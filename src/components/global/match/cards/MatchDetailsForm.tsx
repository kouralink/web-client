import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { searchByUserNameAndTypeAccount } from "@/state/search/searchUsersSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface MatchDetailsFormProps {
  refree_id: string | null;
  location: string | null;
  startin: Date | undefined;
}

export function MatchDetailsForm(props: MatchDetailsFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const defaultValues: Partial<MatchDetailsFormValues> = {
    // get default value from authUser state
    startin: props.startin || undefined,
    location: props.location || undefined,
    refree_id: props.refree_id || undefined,
  };
  const searchResult = useSelector(
    (state: RootState) => state.usersearch.searchResults
  );
  const [searchValue, setSearchValue] = useState("");
  // const [refrees,setRefrees] = useState<User[]>([]);

  useEffect(() => {
    dispatch(
      searchByUserNameAndTypeAccount({
        username: searchValue,
        typeAccount: "refree",
      })
    );
  }, []);

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
                <FormItem className="flex flex-col">
                  <FormLabel>Refrees</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? searchResult.find(
                                (user) => user.uid === field.value
                              )?.uid
                            : "Select a Refree"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Refree..."
                          onValueChange={(v) => setSearchValue(v)}
                          value={searchValue}
                        />
                        <CommandEmpty>No Refree found.</CommandEmpty>
                        <CommandGroup>
                          {searchResult.map((user) => (
                            <CommandItem
                              value={user.uid}
                              key={user.uid}
                              onSelect={() => {
                                form.setValue("refree_id", user.uid);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user.uid === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {user.user_info.username}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the that will set result of the much later
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
