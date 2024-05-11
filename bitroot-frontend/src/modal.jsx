import React from "react";

const Modal = ({ post, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <div
          style={{
            height: "calc(100vh / 2)",
            width: "calc(100vh/2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
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
              width={"220px"}
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
      </div>
    </div>
  );
};

export default Modal;
