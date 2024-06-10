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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ButtonLoading from "@/components/global/ButtonLoading";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { createTournament } from "@/state/tournament/tournamentSlice";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
// Corrected regular expression to match Google Maps location links
const googleMapsLinkRegex =
  /^https:\/\/(www\.)?google\.com\/maps\/place\/[^/]+\/@[0-9.-]+,[0-9.-]+,?[0-9]*z\/data=.*$/;

const createTournamentSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Tournament name must be at least 4 characters.",
    })
    .max(30, {
      message: "Tournament name must not be longer than 30 characters.",
    }),
  location: z.string().regex(googleMapsLinkRegex, {
    message: "Invalid Google Maps location link",
  }),
  description: z
    .string()
    .max(160, {
      message: "Tournament description must be less then 160 characters.",
    })
    .min(4, {
      message: "Tournament description must be more then 4 characters.",
    }),
  logo: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  min_members: z.number().min(2, {
    message: "Minimum members must be at least 2.",
  }),
  max_participants: z
    .number()
    .min(3, {
      message: "Maximum participants must be at least 3.",
    })
    .max(128, {
      message: "Maximum participants must not be more than 128.",
    }),
  start_date: z.date().refine((date) => date > new Date(), {
    message: "Start date must be in the future",
  }),
});

export type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;

export default function CreateTournament() {
  const error = useSelector((state: RootState) => state.tournament.error);
  const isLoading = useSelector(
    (state: RootState) => state.tournament.isLoading
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const form = useForm<CreateTournamentFormValues>({
    resolver: zodResolver(createTournamentSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      location: "",
      description: "",
      logo: [],
      min_members: 2,
      max_participants: 3,
      start_date: new Date(), // default to today
    },
  });

  const handelCancel = () => {
    navigate("/tournament/search");
  };

  const onSubmit = async (data: CreateTournamentFormValues) => {
    data.logo = data.logo[0];
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    await dispatch(createTournament(data));
  };
  // [x]: errors and isloading status
  // [ ]: navigate to tournament page after created succesfully

  return (
    <div className="flex justify-center">
      <Card className="w-full md:w-[800px]">
        <CardHeader>
          <CardTitle>Create Tournament</CardTitle>
          <CardDescription>
            {" "}
            Create your Tournament and invite teams to join.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center px-7  mt-7 mb-8">
                  {status === "loading" ? (
                    <Loader2 className="h-40 w-40 text-primary animate-spin" />
                  ) : (
                    <label htmlFor="fileInput">
                      <Avatar className="w-36 h-36 flex items-center justify-center">
                        <AvatarImage
                          loading="lazy"
                          src={URL.createObjectURL(
                            selectedImage ? (selectedImage as Blob) : new Blob()
                          )}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-6xl">
                          {"T"}
                        </AvatarFallback>
                      </Avatar>
                    </label>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          className="hidden"
                          id="fileInput"
                          accept="image/*"
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setSelectedImage(e.target.files?.[0] || null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Tournament Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your Tournament, you can change it
                        later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about your Tournament"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your Tournament in 160 characters or
                        less.
                      </FormDescription>
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
                        This the google map location (url) that the team will
                        play at.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormMessage className="mb-4"></FormMessage>

                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="datetime">Start Datetime</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          granularity="second"
                          jsDate={field.value}
                          onJsDateChange={field.onChange}
                          aria-label="Start Datetime"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="min_members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Members</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            form.setValue(
                              "min_members",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum members required to create a team.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Participants</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            form.setValue(
                              "max_participants",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum participants allowed in the Tournament.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage className="text-red-500">{error}</FormMessage>

              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handelCancel}>Cancel</Button>
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button type="submit">Create Tournament</Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
