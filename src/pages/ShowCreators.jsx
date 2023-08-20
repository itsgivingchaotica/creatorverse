import React, { useContext, useEffect } from "react";
import Creator from "../components/Creator";
import { CreatorsContext } from "../CreatorsContext";
import "../styles/creator.css";

const ShowCreators = () => {
  let { creators } = useContext(CreatorsContext);

  useEffect(() => {
    console.log(creators.map((creator) => creator.id));
  }, []);
  return (
    <div className="creators-list">
      {creators ? (
        creators.map((creator) => (
          <div key={creator.id} className="creator-container">
            <Creator
              id={creator.id}
              name={creator.name}
              youtubeUrl={creator.youtubeUrl}
              twitterUrl={creator.twitterUrl}
              instagramUrl={creator.instagramUrl}
              description={creator.description}
              imageUrl={creator.imageUrl}
            />
          </div>
        ))
      ) : (
        <div className="empty-results-container">
          <h3 className="empty-results">NO CREATORS YET &#x1F614; </h3>
          <h5 className="create-list">
            GO AHEAD AND CRAFT YOUR CREATORS LIST!
          </h5>
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
