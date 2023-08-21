import React, { useContext, useEffect } from "react";
import Creator from "../components/Creator";
import { CreatorsContext } from "../CreatorsContext";
import { supabase } from "../client";
import "../styles/creator.css";

const ShowCreators = () => {
  let { creators, setCreators } = useContext(CreatorsContext);

  useEffect(() => {
    //fetch the creators to provide updates by getting table from database
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select();
        setCreators(data);
        console.log(data);
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    //create real time update channel
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "creators",
        },
        (payload) => {
          setCreators((prevCreators) => {
            const updatedCreatorIndex = prevCreators.findIndex(
              (creator) => creator.id === payload.new.id
            );
            // Update the local state with the new creator
            if (updatedCreatorIndex !== -1) {
              const updatedCreators = [...prevCreators];
              updatedCreators[updatedCreatorIndex] = payload.new;
              return updatedCreators;
            } else {
              //update with the new creator adde
              return [...prevCreators, payload.new];
            }
          });
        }
      )
      .subscribe();

    fetchCreators();

    return () => {
      // Clean up subscription on component unmount
      channel.unsubscribe();
    };
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
