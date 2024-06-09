import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Frown } from 'lucide-react';

const ErrorPage: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-8xl py-7 flex justify-center items-center'><span className='text-green-600'>4</span><Frown className='w-16 h-16' /><span className='text-green-600'>4</span></h1>
            <p className='text-3xl py-7'>This page took a <span className='text-red-600'>red card</span> . Head back to the home stadium!</p>
            <Button asChild>
                <Link to="/">
                    Go to Home Page
                </Link>
            </Button>
        </div>
    );
}

export default ErrorPage;