import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import { CreatorsContext } from "../CreatorsContext";
import { supabase } from "../client";
import "../styles/editCreator.css";

const EditCreator = () => {
  const { id } = useParams();
  const { creators, setCreators } = useContext(CreatorsContext);
  const creator = creators?.filter((c) => c.id == id);
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState();
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [twitterUrl, setTwitterUrl] = useState();
  const [instagramUrl, setInstagramUrl] = useState();
  const [socialHandleError, setSocialHandleError] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
        const { error } = await supabase.from("creators").select();
        if (error) {
          console.log(error);
        } else {
          //create an object from form information
          const updatedCreator = {
            id: id,
            name: name,
            imageUrl: imageUrl,
            description: description,
            youtubeUrl: youtubeUrl,
            twitterUrl: twitterUrl,
            instagramUrl: instagramUrl,
          };

          //update the creators from context to account for edits
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    //fill in the form on render from current database values
    if (creators) {
      setName(creator[0]?.name);
      setImageUrl(creator[0]?.imageUrl);
      setDescription(creator[0]?.description);
      setYoutubeUrl(creator[0]?.youtubeUrl);
      setTwitterUrl(creator[0]?.twitterUrl);
      setInstagramUrl(creator[0]?.youtubeUrl);
    }
  }, []);

  if (!creator) {
    return <div aria-busy="true" className="creator-loading"></div>;
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
                value={name}
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
                value={imageUrl}
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
                value={description}
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
                value={youtubeUrl}
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
                value={twitterUrl}
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
                value={instagramUrl}
                autoComplete="off"
                onChange={(e) => {
                  handleChangeInstagramUrl(e);
                }}
              />
            </label>
            <div className="edit-form-buttons">
              <div>
                <button
                  type="submit"
                  className="submit-button"
                  style={{ width: "23vw", marginRight: "40px" }}
                >
                  <div className="submit-button-text">SUBMIT</div>
                </button>
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
        </form>
      </div>
      {showModal && (
        <div onClick={handleCloseModal} className="modal-container">
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
              <div className="modal-button-group">
                <button className="undo-button" onClick={handleCloseModal}>
                  ACTUALLY, NEVER MIND
                </button>
                <button
                  className="confirmation-button"
                  onClick={handleDeleteCreator}
                >
                  YUP, ABSOLUTELY SURE!
                </button>
              </div>
            </article>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default EditCreator;
