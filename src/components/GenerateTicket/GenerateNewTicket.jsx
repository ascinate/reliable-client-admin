import { GenerateTicket } from "modules/KnowledgeBase/pages/Articles/pages/View/sections/GenerateTicket.section";
import React from "react";

const GenerateNewTicket = () => {
  return (
    <div className="p-[40px] flex flex-col gap-[30px]">
      <GenerateTicket isAdmin />
    </div>
  );
};

export default GenerateNewTicket;
