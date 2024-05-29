import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { changeAccountType } from "@/state/auth/authSlice";
import UserSearchCard from "@/components/global/cards/UserSearchCard";
import { Input } from "@/components/ui/input"
import { searchByUserName } from '@/state/search/searchUsersSlice';


const searchTeamProfile = z.object({
  accountType: z.enum([
    "user",
    "coach",
    "tournement_manager",
    "refree",
    "player",
  ]),
});

export type changeAccountFormValues = z.infer<typeof searchTeamProfile>;

export function SearchTeamProfile() {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchByUserName(event.target.value));};
    const searchResults = useSelector((state: RootState) => state.usersearch.searchResults);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();

  const form = useForm<changeAccountFormValues>({
    resolver: zodResolver(searchTeamProfile),
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
        <div>Invite Player</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogTitle>Search Player</DialogTitle>
            <div className="grid gap-4 py-4 h-80">
              <Input type="text" onChange={handleSearch} placeholder="Search users..." className='my-10' />

              {searchResults.map((result) => {
                            return <div>
                                    <UserSearchCard result={result.user_info}/>
                                </div>;
              })}
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
