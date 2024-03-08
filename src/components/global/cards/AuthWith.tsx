import { Button } from '@/components/ui/button';
import React from 'react';
import Facebook from "/src/assets/social/facebook.png";
import Google from "/src/assets/social/google.png";
interface AuthWithProps {
    // Add any props you need for the component here
}

const AuthWith: React.FC<AuthWithProps> = () => {
    // Add your component logic here

    return (
        <div className='flex flex-col gap-2'>
            <div className="">
            <div className="flex gap-6 items-center">
              <div className="h-[.1rem] bg-gray-200 w-full before:contents"></div>
              <div className="w-full">or login with</div>
              <div className="h-[.1rem] bg-gray-200 w-full before:contents"></div>
            </div>
          </div>
          <div className="w-full flex gap-2 items-center justify-center ">
            <Button
              variant={"outline"}
              className="bg-white flex gap-2 rounded-lg border-none shadow-lg "
            >
              <img src={Google} className="w-4 h-4 rounded-full" alt="google" />{" "}
              Google
            </Button>
            <Button
              variant={"outline"}
              className="bg-white flex gap-2 rounded-lg border-none shadow-lg"
            >
              <img
                src={Facebook}
                className="w-4 h-4 rounded-full"
                alt="facebook"
              />{" "}
              Facebook
            </Button>
          </div>
        </div>
    );
};

export default AuthWith;