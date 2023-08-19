import React, { useContext } from "react";
import Creator from "../components/Creator";
import { CreatorsContext } from "../CreatorsContext";

const ShowCreators = () => {
  const { creators } = useContext(CreatorsContext);
  console.log(creators);
  return (
    <div
      style={{
        height: "1000px",
        overflow: "scroll",
        display: "grid",
        placeItems: "center",
        marginTop: "200px",
      }}
    >
      {creators.map((creator) => (
        <div
          id={creator.id}
          key={creator.id}
          style={{ display: "grid", placeItems: "center" }}
        >
          <Creator
            name={creator.name}
            youtubeUrl={creator.youtubeUrl}
            twitterUrl={creator.twitterUrl}
            instagramUrl={creator.instagramUrl}
            description={creator.description}
            imageUrl={creator.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default ShowCreators;
