import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { CreatorsContext } from "../CreatorsContext";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import { supabase } from "../client";
import "../styles/profile.css";

const ViewCreator = () => {
  const { id } = useParams();
  const { creators, setCreators } = useContext(CreatorsContext);
  const creator = creators?.filter((c) => c.id == id);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleYoutubeClick = () => {
    window.open(`https://youtube.com/@${creator[0].youtubeUrl}`, "_blank");
  };

  const handleTwitterClick = () => {
    window.open(`https://twitter.com/${creator[0].twitterUrl}`, "_blank");
  };

  const handleInstagramClick = () => {
    window.open(`https://instagram.com/${creator[0].instagramUrl}`, "_blank");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleDeleteCreator = async () => {
    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      const { error } = await supabase.from("creators").select();
      if (error) {
        console.log(error);
      } else {
        //create an object from form information
        //update the creators from context to account for edits
        setCreators((prevCreators) => {
          return prevCreators.filter((creator) => creator.id !== id);
        });
        navigate("/");
      }
    }
  };

  useEffect(() => {
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

  if (!creator || Object.keys(creator).length === 0) {
    return <div aria-busy="true" className="creator-loading"></div>;
  }

  return (
    <div className="creator-profile">
      <article
        className="creator-portrait"
        style={{
          backgroundImage: `url(${creator[0]?.imageUrl})`,
        }}
      ></article>
      <div className="creator-details">
        <h2 className="creator-name">{creator[0]?.name.toUpperCase()}</h2>
        <div className="creator-description">{creator[0].description}</div>
        <div>
          <div className="creator-handles">
            {creator[0].youtubeUrl ? (
              <div className="creator-handle" onClick={handleYoutubeClick}>
                <BsYoutube style={{ marginRight: "10px" }} /> @
                {creator[0].youtubeUrl}
              </div>
            ) : (
              <></>
            )}
            {creator[0].twitterUrl ? (
              <div className="creator-handle" onClick={handleTwitterClick}>
                <BsTwitter style={{ marginRight: "10px" }} /> @
                {creator[0].twitterUrl}
              </div>
            ) : (
              <></>
            )}
            {creator[0].instagramUrl ? (
              <div className="creator-handle" onClick={handleInstagramClick}>
                <BsInstagram style={{ marginRight: "10px" }} /> @
                {creator[0].instagramUrl}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="edit-form-buttons">
          <div>
            <NavLink to={`/edit/${id}`}>
              <button
                className="edit-button"
                style={{ width: "23vw", marginRight: "40px" }}
              >
                <div className="edit-button-text">EDIT</div>
              </button>
            </NavLink>
          </div>
          <div>
            <button
              type="button"
              className="delete-button"
              onClick={handleShowModal}
              style={{ width: "23vw" }}
            >
              <div className="delete-button-text">DELETE</div>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div onClick={handleCloseModal}>
          <dialog open>
            <article>
              <header>
                <a aria-label="Close" class="close"></a>
                <div className="header-message">
                  <span role="img" aria-label="Warning Sign">
                    {"\u26A0\uFE0F"}
                  </span>
                  HOLD UP A SEC!
                  <span role="img" aria-label="Warning Sign">
                    {"\u26A0\uFE0F"}
                  </span>
                </div>
              </header>
              <p className="check-message">
                You're good with saying goodbye to {creator[0].name}?
              </p>
              <div></div>
              <button className="undo-button" onClick={handleCloseModal}>
                ACTUALLY, NEVER MIND
              </button>
              <button
                className="confirmation-button"
                onClick={handleDeleteCreator}
              >
                YUP, ABSOLUTELY SURE!
              </button>
            </article>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default ViewCreator;
