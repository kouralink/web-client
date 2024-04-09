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
import { useRef } from "react";

export function CreateTeamPopUp() {
  const nameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    const name = nameRef.current?.value;
    console.log(name);
  };

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
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={handleSubmit}>
            Create Team
          </Button>
        </DialogClose >
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
