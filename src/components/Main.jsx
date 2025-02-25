import React from "react";
import styles from "../css/Main.module.css";
import { useState } from "react";
import axios from "axios";
import { Container,  Image } from "react-bootstrap";
export default function Main() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [repo, setRepo] = useState([]);
  const [error, setError] = useState("");
  const handleInput = (event) => {
    setUserName(event.target.value);
  };
  const handleSearchEvent = async () => {
    try {
      
      setError("");
      const response = await axios.get(
        `https://api.github.com/users/${userName}`
      );
      setUserData(response.data);
      const reposResponse = await axios.get(
        `https://api.github.com/users/${userName}/repos?per_page=8&sort=updated`
      );
      setRepo(reposResponse.data);
    } catch (err) {
      setError("User not found");
      setUserData(null);
      setRepo([]);
    }
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <input
          className={styles.searchBar}
          onChange={handleInput}
          value={userName}
          placeholder=" 🔎 Search GitHub User"
        />
        <button className={styles.button} onClick={handleSearchEvent}>
          Get User Profile
        </button>
        <div>
          {/* This will be hidded after the user start searching */}
          {userData == null && (
            <div className={styles.content}>
              <div className={styles.wel}>Hello, Welcome 👋🏼!</div>
              Find and explore GitHub user profiles instantly 👀!
              <div className={styles.content}>
                <i>
                  📌 Perfect for developers, recruiters, and GitHub enthusiasts!
                </i>
              </div>
              <div className={styles.urlP}>
                <a
                  href="https://veronikkaa.netlify.app/#contact"
                  rel="noreferrer"
                  target="_blank"
                >
                  My Portfolio
                </a>
              </div>
            </div>
          )}
        </div>
        {/* Extracting the details from the response of the api */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {userData && (
          <Container className={styles.gitDetailCard}>
            <Image
              style={{ display: "inline", width: "150px", height: "150px" }}
              src={userData.avatar_url}
              roundedCircle
            />
            <div className={styles.title_h}>
              {userData.name || userName} | {userData.bio || "No Bio 🙂‍↔️"}
            </div>
            <div className={styles.title}>
              <span className={styles.title_h}>Followers:</span>{" "}
              {userData.followers} &{" "}
              <span className={styles.title_h}>Public Repos: </span>
              {userData.public_repos}
            </div>
            <div></div>
            <div>
              <span className={styles.title_h}>Email:</span>{" "}
              {userData.email || (
                <span className={styles.title}>Not visible 🔒</span>
              )}
            </div>
            <div>
              <span className={styles.title}>Repositories🔗👇🏼:</span>
            </div>
            {repo.length > 0 ? (
              repo.map((repo) => (
                <span className={styles.reposDiv} key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repos}
                  >
                    {repo.name}
                  </a>
                </span>
              ))
            ) : (
              <p>🤯😬 No Repositories</p>
            )}
          </Container>
        )}
      </div>
    </>
  );
}
