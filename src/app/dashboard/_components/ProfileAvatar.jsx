import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfileAvatar = ({ userData }) => {

  console.log(userData?.photoURL);
  
  return (
    userData && <Tooltip>

      <TooltipTrigger>

        <Avatar>
          <AvatarImage
            src={userData?.photoURL}
            alt="@shadcn"
            className="grayscale"
          />

          <AvatarFallback>{userData?.displayName}</AvatarFallback>

        </Avatar>

      </TooltipTrigger>

      <TooltipContent>
        <p>{userData?.displayName}</p>
      </TooltipContent>

    </Tooltip>
  );
};


export default ProfileAvatar;
