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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/state/store";
import { createTeam, setError } from "@/state/team/teamSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../ui/use-toast";

export function CreateTeamPopUp() {
  let isBtnClicked = false;
  const nameRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const error = useSelector((state: RootState) => state.team.error);
  const status = useSelector((state: RootState) => state.team.status);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth.user);
  // set error if user is not authenticated
  //
  const handleSubmit = () => {
    
    if (!auth) {
      dispatch(setError("You need to be authenticated to create a team"));
      // show a toast
      toast({
        variant: "destructive",
        title: "Team not created",
        description: "You need to be authenticated to create a team",
      });
      return;
    }

    const name = nameRef.current?.value;
    if (!name) return;
    // create the team
    dispatch(createTeam({ teamName: name, coach: auth.uid }));
    isBtnClicked = true;
  };
  const setIsClickedfalse = () => {
    isBtnClicked = false;
  }
  useEffect(() => {
    if (!isBtnClicked) {
      return;
    }
    console.log('i"m here', status, error);
    if (status === "failed") {
      toast({
        variant: "destructive",
        title: "Team not created",
        description: error || "An error occurred",
      });
    }
    if (status === "loading") {
      toast({
        variant: "default",
        title: "Creating Team",
        description: "Please wait...",
      });
    }
    // close the dialog
    if (status === "idle") {
      btnRef.current?.click();
    }
    return () => setIsClickedfalse()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error, dispatch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Create your team and invite others to join.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Team Name
            </Label>
            <Input
              id="name"
              ref={nameRef}
              defaultValue="l3zawa"
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild className="hidden">
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {status === "loading" ? 
          
          <Button variant="outline" disabled>
            Creating Team...
          </Button>
          : 
          <Button type="submit" onClick={handleSubmit}>
            Create Team
          </Button>
}
          <DialogClose asChild>
            <button ref={btnRef}>close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
