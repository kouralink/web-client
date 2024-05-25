import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createTeam } from "@/state/team/teamSlice";

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
    .min(4, {
      message: "Team name must be at least 4 characters.",
    })
    .max(30, {
      message: "Team name must not be longer than 30 characters.",
    }),
  teamBio: z.string().max(160).min(4, {
    message: "Team bio must be between 4 and 160 characters.",
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

export function CreateTeamPopUp() {
  const status = useSelector((state: RootState) => state.team.status);
  const error = useSelector((state: RootState) => state.team.error);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

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
    data.logo = data.logo[0]
    dispatch(createTeam(data));



  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>New Team</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] h-screen overflow-y-scroll">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create Team</DialogTitle>
              <DialogDescription>
                Create your team and invite others to join.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center px-7  mt-7 mb-8">
                {status === 'loading' ? (
                  <Loader2 className="h-40 w-40 text-primary animate-spin" />
                ) : (
                  <label htmlFor="fileInput">
                    <Avatar className="w-36 h-36 flex items-center justify-center">
                      <AvatarImage
                        loading="lazy"
                        src={URL.createObjectURL(selectedImage ? selectedImage as Blob: new Blob())}
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
            {error && (
              <FormMessage  className="mb-4">
                {error}
              </FormMessage>
            )}
            <DialogFooter>
              <DialogClose asChild className="hidden">
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {status === "loading" ? (
                <Button variant="outline" disabled>
                  Creating Team...
                </Button>
              ) : (
                <Button type="submit">Create Team</Button>
              )}
              <DialogClose asChild>
                <button>close</button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
