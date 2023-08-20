import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CreatorsContext } from "../CreatorsContext";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import "../styles/profile.css";

const ViewCreator = () => {
  const { id } = useParams();
  const { creators } = useContext(CreatorsContext);
  const creator = creators.filter((c) => c.id == id);

  if (!creator || Object.keys(creator).length === 0) {
    return <div aria-busy="true" className="creator-loading"></div>;
  }

  return (
    <div className="creator-profile">
      <article
        className="creator-portrait"
        style={{
          backgroundImage: `url(${creator[0].imageUrl})`,
        }}
      ></article>
      <div className="creator-details">
        <h2 className="creator-name">{creator[0].name.toUpperCase()}</h2>
        <div className="creator-description">{creator[0].description}</div>
        <div className="creator-handles">
          {creator[0].youtubeUrl ? (
            <div className="creator-handle">
              <BsYoutube style={{ marginRight: "10px" }} /> @
              {creator[0].youtubeUrl}
            </div>
          ) : (
            <></>
          )}
          {creator[0].twitterUrl ? (
            <div className="creator-handle">
              <BsTwitter style={{ marginRight: "10px" }} /> @
              {creator[0].twitterUrl}
            </div>
          ) : (
            <></>
          )}
          {creator[0].instagramUrl ? (
            <div className="creator-handle">
              <BsInstagram style={{ marginRight: "10px" }} /> @
              {creator[0].instagramUrl}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
