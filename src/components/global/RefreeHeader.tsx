import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type RefreeProps = {
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
}


const RefreeHeader: React.FC<RefreeProps> = ({ avatar, firstName, lastName }) => {
    return (
        <Card
            className={"flex w-full rounded-lg p-2 justify-between items-center  "}
        >
            <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
                <div className="flex  items-center gap-2">
                    <Avatar className="w-16 h-16">
                        {avatar && <AvatarImage src={avatar} className="object-cover" />}
                        <AvatarFallback>{lastName && lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2>{firstName}  {lastName} </h2>
                </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4 m-0 p-0">

            </CardContent>
        </Card>
    );
};

export default RefreeHeader;
