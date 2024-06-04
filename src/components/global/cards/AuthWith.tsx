import { Button } from '@/components/ui/button';
import React from 'react';
import Facebook from "/social/facebook.png";
import Google from "/social/google.png";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { login_with_google_or_facebook } from '@/state/auth/authSlice';
interface AuthWithProps {
    // Add any props you need for the component here
}

const AuthWith: React.FC<AuthWithProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    // Add your component logic here
    const handleGoogle  = () =>{
        dispatch(login_with_google_or_facebook({login_with:'google'}))
    }
    const handleFacebook  = () =>{
      dispatch(login_with_google_or_facebook({login_with:'facebook'}))
  }
    return (
        <div className='flex flex-col gap-2'>
            <div className="">
            <div className="flex gap-6 items-center">
              <div className="h-[.1rem] bg-gray-200 w-full before:contents"></div>
              <div className="w-full text-center">Or <span className='hidden sm:inline-block'>Login With</span></div>
              <div className="h-[.1rem] bg-gray-200 w-full before:contents"></div>
            </div>
          </div>
          <div className="w-full flex gap-2 items-center justify-center ">
            <Button
              variant={"outline"}
              className="bg-card flex gap-2 rounded-lg border-none shadow-lg "
              onClick={handleGoogle}
            >
              <img src={Google} className="w-4 h-4 rounded-full" alt="google" />{" "}
              Google
            </Button>
            <Button
              variant={"outline"}
              className="bg-card flex gap-2 rounded-lg border-none shadow-lg"
              onClick={handleFacebook}
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