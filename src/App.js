import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(false);
  const [updatedData, setUpdate] = useState([]);

  const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ex aut numquam quaerat deserunt rerum minima dolor autem reiciendis mollitia!",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fugit repellendus soluta nobis, dolorum officiis debitis vero. Earum dignissimos maxime ipsum ratione nisi, accusamus enim!",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat nam commodi laudantium sapiente provident? Non officiis temporibus quo ipsa, voluptas eveniet accusamus excepturi, enim ratione, adipisci atque dolorem iure ad.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, molestiae fugit laudantium porro dicta mollitia cum corrupti placeat dignissimos. Autem maiores consectetur reiciendis repudiandae architecto officia ut placeat sapiente. Perferendis, doloremque veniam dignissimos nemo recusandae ipsa sint magni, aliquid repudiandae libero quidem et facilis ad odit, quia eligendi error cum!"
  ];

  const titles = [
    "Lorem ipsum dolor sit amet.",
    "Officia sit hic nihil quisquam?",
    "In laudantium quidem hic ipsam?",
    "Dolorum nostrum culpa magni reprehenderit?",
    "Rerum corporis nisi ea eum."
  ];

  const randomFrom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const randomDate = () => {
    const date = Math.floor(Math.random() * 27) + 1;
    const month = Math.floor(Math.random() * 11) + 1;
    const year = new Date().getFullYear();
    return `${month}/${date}/${year}`;
  };

  const createPost = () => {
    let post = (
      <div className="post">
        <img src="https://lorempixel.com/150/200/technics/" alt="iPod" />
        <div className="post-info">
          <h2 className="post-title">{randomFrom(titles)}</h2>
          <small className="post-date">{randomDate()}</small>
          <p className="post-excerpt">{randomFrom(texts)}</p>
        </div>
      </div>
    );
    setUpdate((state) => [...state, post]);
  };

  const showLoading = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);

      setTimeout(() => {
        createPost();
      }, 300);
    }, 1000);
  };

  const scrollHandler = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      showLoading();
    }
  };

  useEffect(() => {
    createPost();
    createPost();
    createPost();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  });

  return (
    <div className="app">
      <h1>Infinite Scroll</h1>
      <div id="container">
        {updatedData.map((data, idx) => (
          <React.Fragment key={idx}>{data}</React.Fragment>
        ))}
      </div>
      <div className={show === true ? "loading show" : "loading"}>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
}
