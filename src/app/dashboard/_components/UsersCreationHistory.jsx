'use client';

import { useState } from "react";
import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

const UsersCreationHistory = () => {

  const [ userCreationHistoryList, setUserCreationHistoryList ] = useState([]);

  return (
    <div>

      <h2 className="font-bold text-2xl mt-5 mb-2">My Ads</h2>
      
      {userCreationHistoryList?.length === 0 ? (

        <div className="p-5 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center mt-6 gap-3">

            <Ghost size={90} />

            <h2 className="text-xl">No creations yet</h2>

            <Button className="hover:cursor-pointer">Create Your First Ad</Button>

        </div>

      ) : (

        <div></div>

      )}
      
    </div>
  )
}

export default UsersCreationHistory;
