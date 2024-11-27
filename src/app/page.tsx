import Button from "@/components/Button";
import Typography from "@/components/Typography";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <Typography as="h1">Menu jest puste</Typography>
      <Typography as="h2">W tym menu nie ma jeszcze żadnych linków.</Typography>
      <Button>Dodaj pozycję menu</Button>
    </div>
  );
};

export default Home;
