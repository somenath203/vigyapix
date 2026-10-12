import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const ProfileAvatar = ({ userData }) => {

  if (!userData) {

    return null;

  }

  return (
    
    <Tooltip>

      <TooltipTrigger>

        <Avatar>

          <AvatarImage
            src={userData?.photoURL || undefined}
            alt={userData?.displayName || "User"}
            referrerPolicy="no-referrer"
            /**
             * EXPLANATION OF referrerPolicy="no-referrer":
             *
             * Prevents the browser from sending the current page's URL to the image host
             * when requesting the user's profile picture.
             *
             * Example:
             * Current page URL: https://vigyapix.com/dashboard
             *
             * Without referrerPolicy="no-referrer":
             * The image request may include:
             * Referer: https://vigyapix.com/dashboard
             *
             * With referrerPolicy="no-referrer":
             * The image request does not include the Referer header.
             *
             * This may help display the profile picture if the image host blocks requests
             * based on referrer information.
             */
          />

          <AvatarFallback>{userData?.displayName || "User"}</AvatarFallback>

        </Avatar>

      </TooltipTrigger>

      <TooltipContent>
        <p>{userData?.displayName || "User"}</p>
      </TooltipContent>

    </Tooltip>

  );

};


export default ProfileAvatar;
