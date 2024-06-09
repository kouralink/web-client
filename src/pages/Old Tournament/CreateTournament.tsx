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
  } from "@/components/ui/card"

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const createTournamentSchema = z.object({
  teamName: z.string()
    .min(4, {
      message: "Tournament name must be at least 4 characters.",
    })
    .max(30, {
      message: "Tournament name must not be longer than 30 characters.",
    }),
  as:z.any(),
  teamBio: z.string().max(160,{
    message: "Tournament bio must be less then 160 characters.",
  }).min(4, {
    message: "Tournament bio must be more then 4 characters.",
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

export type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;

export default function CreateTournament() {

  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<CreateTournamentFormValues>({
    resolver: zodResolver(createTournamentSchema),
    mode: "onSubmit",
    defaultValues: {
      logo: undefined,
      teamName: "",
      teamBio: "",
    },
  });
  const onSubmit = async (data: CreateTournamentFormValues) => {
    data.logo = data.logo[0]
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

  };  

  return (
    <div className="flex justify-center">
    <Card className="w-[800px]">
    <CardHeader>
      <CardTitle>Create Tournament</CardTitle>
      <CardDescription> Create your Tournament and invite teams to join.</CardDescription>
    </CardHeader>
    <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
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
                    <FormLabel>Tournament Name</FormLabel>
                    <FormControl>
                      <Input  placeholder="Tournament Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your Tournament.
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
                    <FormLabel>Tournament Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about your Tournament"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe your Tournament in 160 characters or less.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
              <FormMessage  className="mb-4">
                
              </FormMessage>
          

<FormField
          control={form.control}
          name="as"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of start Tournament</FormLabel>
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
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                This date of start Tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

           <CardFooter className="flex justify-between">

                <Button variant="outline">Cancel</Button>
              {status === "loading" ? (
                <Button variant="outline" disabled>
                  Creating Tournament...
                </Button>
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
