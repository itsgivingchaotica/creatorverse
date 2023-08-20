import React from "react";
import "@picocss/pico/css/pico.css";
import "../styles/creator.css";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";

const Creator = ({
  name,
  youtubeUrl,
  twitterUrl,
  instagramUrl,
  description,
  imageUrl,
}) => {
  const handleYoutubeClick = () => {
    window.open(`https://youtube.com/@${youtubeUrl}`, "_blank");
  };
  const handleTwitterClick = () => {
    window.open(`https://twitter.com/${twitterUrl}`, "_blank");
  };
  const handleInstagramClick = () => {
    window.open(`https://instagram.com/${instagramUrl}`, "_blank");
  };
  return (
    <article
      id="article"
      className="background-tint"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="card-content">
        <h2 className="card-title">{name.toUpperCase()}</h2>
        <div className="card-links">
          {youtubeUrl ? (
            <p className="card-text" onClick={handleYoutubeClick}>
              <BsYoutube />
            </p>
          ) : (
            <></>
          )}
          {twitterUrl ? (
            <p className="card-text" onClick={handleTwitterClick}>
              <BsTwitter />
            </p>
          ) : (
            <></>
          )}
          {instagramUrl ? (
            <p className="card-text" onClick={handleInstagramClick}>
              <BsInstagram />
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="card-description-container">
          <p className="card-description">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Creator;
