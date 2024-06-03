import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function ContactFormCard() {
    const authError = useSelector((state: RootState) => state.auth.error);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const authLoading = useSelector((state: RootState) => state.auth.loading);

    if (!authError && authUser) {
        navigate("/");
    }

    return (
        <Card className=" aspect-square flex flex-col justify-center w-full lg:w-2/3 lg:rounded-r-3xl py-14 lg-p-0">

            <CardContent className="">
                <form >
                    <div className="grid w-full items-center gap-4">
                        <div className="lg:flex justify-around">
                            <div className="flex flex-col space-y-1.5 lg:w-1/3 py-5 lg:p-0">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 lg:w-1/3">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="lg:flex justify-around">
                            <div className="flex flex-col space-y-1.5 lg:w-1/3 py-5 lg:p-0">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 lg:w-1/3">
                                <Label htmlFor="phone_number">Phone Number</Label>
                                <Input
                                    type="phone_number"
                                    id="phone_number"
                                    name="phone_number"
                                    placeholder="+212 6 00 00 00 00"
                                    required
                                />
                            </div>
                        </div>

                        <div className="py-2">
                            <Label className="lg:px-16">Select Subject?</Label>
                            <RadioGroup defaultValue="comfortable" className="flex flex-col lg:flex-row  justify-around py-3">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="General1" id="r1"/>
                                    <Label htmlFor="r1">General Inquiry</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="General2" id="r2" />
                                    <Label htmlFor="r2">General Inquiry</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="General3" id="r3" />
                                    <Label htmlFor="r3">General Inquiry</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        <div className="lg:px-14 py-3">
                            <Label htmlFor="Message">Message</Label>
                            <Textarea placeholder="Type your message here." id="Message" name="Message" className="resize-none"/>
                        </div>
                            <div>
                                {authError && <p className="text-red-500">{authError}</p>}
                            </div>
                            <div className="flex justify-end">
                                {authLoading ? (
                                    <Button disabled>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit">Send Message</Button>
                                )}
                            </div>
                        </div>
                </form>
            </CardContent>
        </Card>
    )
}