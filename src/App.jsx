import React, { useState, useEffect } from "react";
import axios from "axios";
import asset from "../assets/demo.png";
import Modal from "./modal";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div
      style={{
        display: "flex",
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "repeat(2, minmax(150px, 2fr))",
          gridTemplateRows: "repeat(2, minmax(150px, 2fr))",
          gap: "5em",
          padding: "15%",
        }}
      >
        {posts.map((post) => (
          <div key={post.id}>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em",
              }}
              onClick={() => openModal(post)}
            >
              <img
                src={post.thumbnail.small}
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: "10px 10px 0 0" }}
              ></img>
              <div style={{ padding: "10px" }}>
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "18px",
                    fontWeight: "bold",
                    whiteSpace: "wrap",
                  }}
                >
                  {post.title}
                </div>
                <div style={{ textWrap: "balance" }}>{post.content}</div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{post.author.name}</span>
                  <span>{post.author.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && <Modal post={selectedPost} onClose={closeModal} />}
    </div>
  );
};

export default App;
