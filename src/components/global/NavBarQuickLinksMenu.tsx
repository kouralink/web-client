import { ChevronDown } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';


export default function NavBarQuickLinksMenu() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2">
        Quick Links <ChevronDown />
      </PopoverTrigger>
      <PopoverContent>
        <ul className="flex flex-col gap-2  [&>li:hover]:underline [&>li]:cursor-pointer ">
          <li>Create Team</li>
          <hr />
          <li>Join Team</li>
        </ul>
      </PopoverContent>
    </Popover>
  )}