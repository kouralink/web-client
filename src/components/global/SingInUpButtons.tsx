import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function SingInUpButtons() {
    return (
        <div className="flex gap-1 w-full h-fit items-center justify-center">
              <Link to={"/auth"} className="h-full">
                <Button
                  type="button"
                  className="text-accent-foreground bg-accent hover:bg-primary-foreground focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-3 text-center "
                >
                  Log in
                </Button>
              </Link>

              <Link to={"/auth/register"} className="h-full" >
                <Button
                  type="button"
                  className="focus:outline-none font-medium rounded-lg text-sm px-6 py-3 text-center bg-primary-700 text-primary-foreground hover:bg-primary/90"
                >
                  Sing up
                </Button>
              </Link>
            </div>
    )
}