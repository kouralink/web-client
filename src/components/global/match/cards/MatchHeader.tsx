import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MatchStatus } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import {
  cancelMatch,
  editResult,
  endMatch,
  setInProgress,
} from "@/state/match/matchSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MatchHeaderProps {
  isRefree: boolean;
  score1: number | null;
  score2: number | null;
  status: MatchStatus;
}

interface statusSelectType {
  variant: "outline" | "default" | "secondary";
  value: string;
}

const MatchHeader: React.FC<MatchHeaderProps> = (props) => {
  const statusSelect = {
    pending: { variant: "outline", value: "Pending" } as statusSelectType,
    finish: { variant: "default", value: "Finished" } as statusSelectType,
    cancled: { variant: "secondary", value: "Cancled" } as statusSelectType,
    coachs_edit: {
      variant: "outline",
      value: "Coaches editing",
    } as statusSelectType,
    refree_waiting: {
      variant: "default",
      value: "Refree waiting",
    } as statusSelectType,
    in_progress: {
      variant: "default",
      value: "In progress",
    } as statusSelectType,
  };
  const dispatch = useDispatch<AppDispatch>();
  const handelEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const n1 = parseInt(formData.score1 as string);
    const n2 = parseInt(formData.score2 as string);
    dispatch(editResult({ team1: n1, team2: n2 }));
  };
  const handelEnd = () => {
    dispatch(endMatch());
  };
  const handelCancel = () => {
    dispatch(cancelMatch());
  };
  const handelInProgress = () => {
    dispatch(setInProgress());
  };
  return (
    <Card
      className={[
        "flex flex-col w-full xl:w-[550px]  rounded-lg  justify-between items-center py-2 px-8 text-card-foreground ",
        // , (props.team1.score !== null && props.team2.score !== null) && props.team1.score >= props.team2.score ? props.team1.score == props.team2.score ? "bg-yellow-100 dark:bg-yellow-800":"bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
      ].join(" ")}
    >
      <CardHeader className="flex flex-row w-full items-center justify-between gap-4 m-0 p-0 ">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-6xl flex gap-1 font-mono w-full items-center justify-center">
            <span>{props.score1}</span>
            <span>-</span>
            <span> {props.score2}</span>
          </div>
          <div className="text-muted-foreground text-sm flex gap-2">
            <span>Status :</span>
            <Badge variant={statusSelect[props.status].variant}>
              {statusSelect[props.status].value}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        {props.isRefree &&
          (props.status === "pending" || props.status === "in_progress") && (
            <div className="flex gap-2 p-4">
              {props.status === "pending" ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"default"}>set In Progress</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        That's Mean the match has started.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handelInProgress}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit Result</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Result</DialogTitle>
                        <DialogDescription>
                          Edit Result Of match
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handelEdit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="score1" className="text-right">
                              Left :
                            </Label>
                            <Input
                              id="score1"
                              defaultValue={props.score1 ? props.score1 : 0}
                              type="number"
                              name="score1"
                              required
                              className="col-span-3"
                              // positive and under 100
                              min={0}
                              max={100}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="score2" className="text-right">
                              Right :
                            </Label>
                            <Input
                              id="score2"
                              defaultValue={props.score2 ? props.score2 : 0}
                              type="number"
                              name="score2"
                              required
                              className="col-span-3"
                              min={0}
                              max={100}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Match has ended</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          That's Mean the match has Ended.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handelEnd}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"}>Match has canceled</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      That's Mean the match has Canceled.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handelCancel}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
