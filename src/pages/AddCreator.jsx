import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import { supabase } from "../client";
import "../styles/addCreator.css";

const AddCreator = () => {
  const [name, setName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState(null);
  const [twitterUrl, setTwitterUrl] = useState(null);
  const [instagramUrl, setInstagramUrl] = useState(null);
  const [socialHandleError, setSocialHandleError] = useState(false);
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeYoutubeUrl = (e) => {
    setYoutubeUrl(e.target.value);
  };
  const handleChangeTwitterUrl = (e) => {
    setTwitterUrl(e.target.value);
  };
  const handleChangeInstagramUrl = (e) => {
    setInstagramUrl(e.target.value);
  };

  const handleSubmitForm = async () => {
    if (!name || !imageUrl || !description) {
      console.log("prevent submission");
    } else if (!youtubeUrl && !twitterUrl && !instagramUrl) {
      setSocialHandleError(true);
    } else {
      setSocialHandleError(false);
      const { error } = await supabase.from("creators").insert([
        {
          name: name,
          imageUrl: imageUrl,
          description: description,
          youtubeUrl: youtubeUrl,
          twitterUrl: twitterUrl,
          instagramUrl: instagramUrl,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="creator-form-container">
      <div className="creator-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitForm();
            return false;
          }}
        >
          <div className="form-fields">
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                autocomplete="off"
                required
                onChange={(e) => {
                  handleChangeName(e);
                }}
              />
            </label>
            <label htmlFor="image">
              <div>Image</div>
              <div className="helper-text">
                Provide a link to an image of your creator. Be sure to include
                the http://
              </div>
              <input
                type="text"
                id="image"
                name="image"
                autocomplete="off"
                required
                onChange={(e) => {
                  handleChangeImageUrl(e);
                }}
              />
            </label>
            <label htmlFor="description">
              <div>Description</div>
              <div className="helper-text">
                Provide a description of the creator. Who are they? What makes
                them interesting?
              </div>
              <textarea
                type="text"
                id="image"
                name="image"
                autocomplete="off"
                required
                onChange={(e) => {
                  handleChangeDescription(e);
                }}
              />
            </label>
            <div className="social-links-header">SOCIAL MEDIA LINKS</div>
            <div
              className={
                socialHandleError ? "social-handle-error" : "helper-text"
              }
            >
              Provide at least one of the creator's social media links
            </div>
            <label htmlFor="youtubeUrl">
              <div className="handle-icon-container">
                <div className="handle-icon">
                  <BsYoutube />
                </div>
                <div>YouTube</div>
              </div>
              <div className="helper-text">
                The creator's YouTube handle (without the @)
              </div>
              <input
                type="text"
                id="youtubeUrl"
                name="youtubeUrl"
                autocomplete="off"
                onChange={(e) => {
                  handleChangeYoutubeUrl(e);
                }}
              />
            </label>
            <label htmlFor="twitterUrl">
              <div className="handle-icon-container">
                <div className="handle-icon">
                  <BsTwitter className="handle-icon" /> Twitter
                </div>
              </div>
              <div className="helper-text">
                The creator's Twitter handle (without the @)
              </div>
              <input
                type="text"
                id="twitterUrl"
                name="twitterUrl"
                autocomplete="off"
                onChange={(e) => {
                  handleChangeTwitterUrl(e);
                }}
              />
            </label>
            <label htmlFor="instagramUrl">
              <div className="handle-icon-container">
                <div className="handle-icon">
                  <BsInstagram className="handle-icon" /> Instagram
                </div>
              </div>
              <div className="helper-text">
                The creator's Instagram handle (without the @)
              </div>
              <input
                type="text"
                id="instagramUrl"
                name="instagramUrl"
                autocomplete="off"
                onChange={(e) => {
                  handleChangeInstagramUrl(e);
                }}
              />
            </label>
            <div>
              <button
                type="submit"
                className="submit-button"
                style={{ width: "3000px" }}
              >
                <div>SUBMIT</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;
