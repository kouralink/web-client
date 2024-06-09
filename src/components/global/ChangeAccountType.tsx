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
import { changeAccountType } from "@/state/auth/authSlice";

const changeAccountSchema = z.object({
  accountType: z.enum([
    "user",
    "coach",
    "tournament_manager",
    "refree",
    "player",
  ]),
});

export type changeAccountFormValues = z.infer<typeof changeAccountSchema>;

export function ChangeAccountType() {
    const error = useSelector((state: RootState) => state.auth.error);
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();

  const form = useForm<changeAccountFormValues>({
    resolver: zodResolver(changeAccountSchema),
    mode: "onSubmit",
    defaultValues: {
      accountType: authUser?.accountType,
    },
  });
  const onSubmit = async (data: changeAccountFormValues) => {
    await dispatch(changeAccountType(data));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Change Account Type</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Change Your Account Type</DialogTitle>
              <DialogDescription>
                By changing your account type, you will be able to access
                diffrerent features depending on the account type you choose.{" "}
                <br />
                You can't change your account type until be free from your old
                account type restrictions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Account Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="player">Player</SelectItem>
                        <SelectItem value="coach">Coach</SelectItem>
                        <SelectItem value="tournament_manager">
                          Tournement Manager
                        </SelectItem>
                        <SelectItem value="refree">Refree</SelectItem>
                        <SelectItem value="user">User</SelectItem>
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
                <button type="button">close</button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
