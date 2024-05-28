import { Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {formatDistanceToNow} from "date-fns/formatDistanceToNow"


const SeparatorDemo = ()=> {
  return (
    <ScrollArea className="h-full w-full rounded-md border">
    
    <div>
      <div className="space-y-1">

        {data.map((item) => {
            return <div><div className="flex justify-between p-5 ">
                <div>
                <h4 className="text-sm font-medium leading-none">{item.name}</h4>
                <p className="text-md ">{item.message}</p>
                <div className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</div>
                </div>
                {item.type==="request" ?<div className="flex "> <Check className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"/> 
                                                <X className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"/> </div> : null}
                </div> 
                <Separator/>
            </div>
        })}

      </div>
      
    </div>
    </ScrollArea>
  )
}


const data=[
    {
        "type": "request",
        "name": "Pedro Duarte",
        "message":"can u join to team",
        "date": "2024-05-27"
    },
    {
        "type": "request",
        "name": "Pedro Duarte",
        "message":"can u join to team",
        "date": "2020-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2019-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2015-09-01"
        
    },
    {
        "type": "request",
        "name": "Pedro Duarte",
        "message":"can u join to team",
        "date": "2021-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2021-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2021-09-01"
        
    },
    {
        "type": "request",
        "name": "Pedro Duarte",
        "message":"can u join to team",
        "date": "2021-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2021-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2021-09-01"
        
    },
    {
        "type": "request",
        "name": "Pedro Duarte",
        "message":"can u join to team",
        "date": "2021-09-01"
        
    },
    {
        "type": "message",
        "name": "Pedro Duarte",
        "message":"your request has been approved",
        "date": "2021-09-01"
    }
]
export default SeparatorDemo;

