import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const notifications = [
  {
    title: "Start In :",
    description: " After 3hrs",
  },
  {
    title: "Stadium :",
    description: " Marrakech Clan",
  },
  {
    title: "Refree :",
    description: " Halima bnt lkhdr",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function LiveEvenetCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[280px] rounded-lg", className)} {...props}>

      <CardHeader className="flex flex-row  items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>WAL</AvatarFallback>
        </Avatar>
          <h2>WAL</h2>
        </div>
        <span className="text-3xl text-muted-foreground">VS</span>
        <div className="flex flex-col items-center gap-2" style={{ margin: 0 }}>
        <Avatar className="w-16 h-16" >
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback >LMO</AvatarFallback>
        </Avatar>
        <h2>LMO</h2>
        </div>
      </CardHeader>

      <CardContent className="flex  w-full gap-1">
        <div className="w-full">
       
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-center text-center  w-full"
            >
              <div className="flex  items-center text-center w-full gap-2">
                <p className="text-sm w-full font-medium leading-none">
                  {notification.title}
                </p>
                
                <p className="text-sm  w-full text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex text-center items-center w-full">
        <div className="w-full">

        <Button className="w-fit text-lg">Upcoming</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
