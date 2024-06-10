import { Button } from "@/components/ui/button";

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
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createTeam } from "@/state/team/teamSlice";
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
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const createTeamSchema = z.object({
  teamName: z
    .string()
    .regex(/^[a-z0-9_]+$/, {
      message:
        "Team name must be lowercase and contain only letters and numbers and underscores.",
    })
    .min(4, {
      message: "Team name must be at least 4 characters.",
    })
    .max(30, {
      message: "Team name must not be longer than 30 characters.",
    }),
  teamBio: z
    .string()
    .max(160, {
      message: "Team bio must be less then 160 characters.",
    })
    .min(4, {
      message: "Team bio must be more then 4 characters.",
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
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

export default function CreateTeam() {
  const status = useSelector((state: RootState) => state.team.status);
  const error = useSelector((state: RootState) => state.team.error);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team.team);

  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    mode: "onSubmit",
    defaultValues: {
      logo: undefined,
      teamName: "",
      teamBio: "",
    },
  });
  const onSubmit = async (data: CreateTeamFormValues) => {
    data.logo = data.logo[0];
    dispatch(createTeam(data));
  };
  const navigate = useNavigate();

  // redirect to team page after team created
  useEffect(() => {
    if (error === "  0  " && status !== "loading" && team.teamName) {
      // react router redirect
      navigate(`/team/page/${team.teamName}`);
    }
  }, [error, navigate, team.teamName, status]);

  const handelCancel = () => {
    navigate("/team/search");
  };

  return (
    <Card className="w-full md:w-[800px]">
      <CardHeader>
        <CardTitle>Create Team</CardTitle>
        <CardDescription>
          {" "}
          Create your team and invite others to join.
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
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Team Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your team.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamBio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about your team"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe your team in 160 characters or less.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <FormMessage className="mb-4">{error}</FormMessage>}
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handelCancel}>Cancel</Button>
              {status === "loading" ? (
                <Button variant="outline" disabled>
                  Creating Team...
                </Button>
              ) : (
                <Button type="submit">Create Team</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
