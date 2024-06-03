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
import SearchInRefrees from "../SearchInRefrees";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { getUser } from "@/state/user/userSlice";
import MatchMemberCard from "./MatchMemberCard";
import { Timestamp } from "firebase/firestore";
import { updateMatchDetails } from "@/state/match/matchSlice";


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

export type MatchDetailsFormValues = z.infer<typeof matchDetailsFormSchema>;

interface MatchDetailsFormProps {
  refree_id: string | null;
  location: string | null;
  startin: Date | undefined;
}

export function MatchDetailsForm(props: MatchDetailsFormProps) {
  const RefreeInfo = useSelector((state: RootState) => state.user);
  const [rid, setRid] = useState<null | string>(props.refree_id);
  const dispatch = useDispatch<AppDispatch>();
  const defaultValues: Partial<MatchDetailsFormValues> = {
    // get default value from authUser state
    startin: props.startin || undefined,
    location: props.location || undefined,
    refree_id: props.refree_id || undefined,
  };

  const form = useForm<MatchDetailsFormValues>({
    resolver: zodResolver(matchDetailsFormSchema),
    defaultValues,
    mode: "onChange",
  });
  useEffect(() => {
    console.log(rid);
    if (rid) {
      dispatch(getUser(rid));
    }
  }, [dispatch, rid]);

  const onSubmit = async (data: MatchDetailsFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(Timestamp.fromDate(data.startin));
    await dispatch(updateMatchDetails({matchData:data,who: "coach"}))
  };

  const selelct = (v: string) => {
    console.log(v);
    form.setValue("refree_id", v);
    setRid(v);
  };

  return (
    <Card className="w-[600px] flex flex-col h-full gap-2">
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
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Refrees</FormLabel>
                  <SearchInRefrees select={selelct} />
                  <FormDescription>
                    Refree is the person who can change & set result of the
                    match, the most unique piece in the plateform.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("refree_id") && RefreeInfo.uid && (
              <div>
                {" "}
                Refree:
                <MatchMemberCard
                  member={{
                    joinedAt: RefreeInfo.user.joinDate || Timestamp.now(),
                    role: "member",
                    team_id: "",
                    userInfo: RefreeInfo.user,
                    uid: RefreeInfo.uid,
                  }}
                />
              </div>
            )}

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
