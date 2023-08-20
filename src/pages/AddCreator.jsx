import React from "react";
import { NavLink } from "react-router-dom";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import "../styles/addCreator.css";

const AddCreator = () => {
  return (
    <div className="creator-form-container">
      <div className="creator-form">
        <form>
          <div className="form-fields">
            <label for="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                autocomplete="off"
                required
              />
            </label>
            <label for="image">
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
              />
            </label>
            <label for="description">
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
              />
            </label>
            <div className="social-links-header">SOCIAL MEDIA LINKS</div>
            <div className="helper-text">
              Provide at least one of the creator's social media links
            </div>
            <label for="youtubeUrl">
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
              />
            </label>
            <label for="twitterUrl">
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
              />
            </label>
            <label for="instagramUrl">
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
              />
            </label>
            <div className="submit-button">
              <NavLink to={"/"}>
                <button
                  className="submit-button-text"
                  style={{ width: "3000px" }}
                >
                  <div className="submit-button-text">SUBMIT</div>
                </button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;
