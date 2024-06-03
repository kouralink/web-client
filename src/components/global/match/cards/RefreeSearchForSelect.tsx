import { Separator } from "@/components/ui/separator";
import { User } from "@/types/types";
import { Button } from "@/components/ui/button";

interface RefreeSearchCardForSelect {
  result: User;
  id:string
  select:(s:string)=>void
}

const RefreeSearchCardForSelect: React.FC<RefreeSearchCardForSelect> = ({ result,id,select }) => {
  const handleInvie = async () => {
    select(id)
  };
  return (
    <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center p-5">
            {result.avatar ? (
              <img
                src={result.avatar}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="rounded-full bg-gray-300 w-24 h-24"></div>
            )}
            <h1 className="flex flex-col p-5 font-bold">
              {result.username}
            </h1>
          </div>
          <Button onClick={handleInvie}>Select</Button>
        </div>
      <Separator />
    </div>
  );
};

export default RefreeSearchCardForSelect;
