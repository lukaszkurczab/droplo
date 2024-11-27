import React from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Image from "next/image";

const EmptyMenu: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <Typography as="h1" className="font-semibold text-base">
        Menu jest puste
      </Typography>
      <Typography as="h2" className="mb-6 mt-1 font-normal">
        W tym menu nie ma jeszcze żadnych linków.
      </Typography>
      <Button variant="contained">
        <Image alt="Add" src="/add.svg" width={20} height={20} />
        <Typography as="p" className="text-sm">
          Dodaj pozycję menu
        </Typography>
      </Button>
    </div>
  );
};

export default EmptyMenu;
