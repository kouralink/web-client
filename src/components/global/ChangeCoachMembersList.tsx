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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { changeCoach } from "@/state/team/teamSlice";

const changeCoachSchema = z.object({
  newCoachId: z.string().nonempty("Please select a new coach"),
});

export type changeCoachFormValues = z.infer<typeof changeCoachSchema>;

export function ChangeCoach() {
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const authUser = useSelector((state: RootState) => state.auth);
  const membersList = useSelector((state: RootState) => state.team.members);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<changeCoachFormValues>({
    resolver: zodResolver(changeCoachSchema),
    mode: "onSubmit",

  });
  const onSubmit = async (data: changeCoachFormValues) => {
    console.log(data);
    await dispatch(changeCoach({ uid: data.newCoachId, teamId: membersList[0].team_id }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Change Coach</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Resigning from the rank of coach</DialogTitle>
              <DialogDescription>
                By giving the your coach role to another member, you will be
                resigning from the rank of coach. Are you sure you want to
                continue?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="newCoachId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Coach</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the new coach" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          membersList.map((member, index) => {
                            if (member.uid !== authUser.uid && member.role === "member") {
                              return <SelectItem key={index} value={member.uid}>{member.userInfo?.username}</SelectItem>
                            }
                          }
                          )
                        }

                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <FormMessage className="mb-4">{error}</FormMessage>}
            <DialogFooter>
              <DialogClose asChild className="hidden">
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {isLoading ? (
                <Button variant="outline" disabled>
                  Please wait...
                </Button>
              ) : (
                <Button type="submit">Change</Button>
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
