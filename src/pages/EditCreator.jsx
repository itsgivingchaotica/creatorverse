import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import { CreatorsContext } from "../CreatorsContext";
import { supabase } from "../client";
import "../styles/editCreator.css";

const EditCreator = () => {
  const { id } = useParams();
  const { creators, setCreators } = useContext(CreatorsContext);
  const creator = creators.filter((c) => c.id == id);
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState();
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [twitterUrl, setTwitterUrl] = useState();
  const [instagramUrl, setInstagramUrl] = useState();
  const [socialHandleError, setSocialHandleError] = useState(false);
  const navigate = useNavigate();

  const updateCreator = (updatedCreator) => {
    setCreators((prevCreators) => {
      const updatedCreators = prevCreators.map((creator) => {
        if (creator.id === updatedCreator.id) {
          return { ...creator, ...updatedCreator };
        }
        return creator;
      });
      return updatedCreators;
    });
  };

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

  const handleSubmitEdit = async () => {
    console.log("handling submit");
    if (!name) {
      setName(creator[0]?.name);
      console.log("prevent submission");
    }
    if (!imageUrl) {
      setImageUrl(creator[0]?.imageUrl);
    }
    if (!description) {
      setDescription(creator[0]?.description);
    }

    if (!youtubeUrl && !twitterUrl && !instagramUrl) {
      console.log(youtubeUrl);
      setSocialHandleError(true);
    } else {
      setSocialHandleError(false);
      console.log("submitting");
      const { error } = await supabase
        .from("creators")
        .update([
          {
            name: name,
            imageUrl: imageUrl,
            description: description,
            youtubeUrl: youtubeUrl,
            twitterUrl: twitterUrl,
            instagramUrl: instagramUrl,
          },
        ])
        .eq("id", id);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        const { data, error: fetchError } = await supabase
          .from("creators")
          .select();
        if (fetchError) {
          console.log(fetchError);
        } else {
          const updatedCreator = {
            id: id,
            name: name,
            imageUrl: imageUrl,
            description: description,
            youtubeUrl: youtubeUrl,
            twitterUrl: twitterUrl,
            instagramUrl: instagramUrl,
          };
          setCreators((prevCreators) => {
            return prevCreators.map((creator) =>
              creator.id === id ? updatedCreator : creator
            );
          });
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    setName(creator[0]?.name);
    setImageUrl(creator[0]?.imageUrl);
    setDescription(creator[0]?.description);
    setYoutubeUrl(creator[0]?.youtubeUrl);
    setTwitterUrl(creator[0]?.twitterUrl);
    setInstagramUrl(creator[0]?.youtubeUrl);
  }, []);

  if (!creator) {
    return <div>Loading...</div>; // Or any other appropriate loading or error message
  }

  return (
    <div className="creator-form-container">
      <div className="creator-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitEdit();
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
                value={name || creator[0]?.name}
                autoComplete="off"
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
                value={imageUrl || creator[0]?.imageUrl}
                autoComplete="off"
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
                value={description || creator[0]?.description}
                autoComplete="off"
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
                value={youtubeUrl || creator[0]?.youtubeUrl}
                id="youtubeUrl"
                name="youtubeUrl"
                autoComplete="off"
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
                value={twitterUrl || creator[0]?.twitterUrl}
                autoComplete="off"
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
                value={instagramUrl || creator[0]?.instagramUrl}
                autoComplete="off"
                onChange={(e) => {
                  handleChangeInstagramUrl(e);
                }}
              />
            </label>
            <div className="edit-form-buttons">
              <div className="submit-button">
                <button
                  type="submit"
                  className="submit-button-text"
                  style={{ width: "23vw", marginRight: "40px" }}
                >
                  <div className="submit-button-text">SUBMIT</div>
                </button>
              </div>
              <div className="delete-button">
                <button
                  type="button"
                  className="delete-button-text"
                  style={{ width: "23vw" }}
                >
                  <div className="delete-button-text">DELETE</div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCreator;
