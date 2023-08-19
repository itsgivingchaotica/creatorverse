import React from "react";

const Creator = ({
  name,
  youtubeUrl,
  twitterUrl,
  instagramUrl,
  description,
  imageUrl,
}) => {
  console.log(name);
  return (
    <div
      style={{
        zIndex: 99999,
        color: "black",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>{name}</div>
      <div style={{ width: "200px", height: "200px", backgroundColor: "red" }}>
        <img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>
      <div>About: {description}</div>
      <div>Youtube: @{youtubeUrl}</div>
      <div>Twitter: @{twitterUrl}</div>
      <div>Instgram: @{instagramUrl}</div>
    </div>
  );
};

export default Creator;
