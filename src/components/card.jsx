import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
import Videocard from "./videocard";
   
  export function ProfileCard() {
    return (
        <div className="flex mr-6 ml-6">
     
      <div className="mt-4 w-full">
        <Videocard/>
      </div>
      </div>
    );
  }

export default ProfileCard;  