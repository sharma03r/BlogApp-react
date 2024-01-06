import { useState, useRef, useEffect, useReducer } from "react";
import { db } from "./firebaseInit";
import { collection, addDoc } from "firebase/firestore";

function blogReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...state];
    case "DELETE":
      return state.filter((blog, index) => index !== action.index);
    default:
      return [];
  }
}

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const titleRef = useRef(null);
  const [blogs, dispatch] = useReducer(blogReducer, []);

  useEffect(() => {
    titleRef.current.focus();
  }, []);
  useEffect(() => {
    if (blogs.length && blogs[0].title.length) document.title = blogs[0].title;
    else {
      document.title = "No Blog!";
    }
  }, [blogs]);

  async function handleSubmit(e) {
    e.preventDefault();
    //setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    dispatch({
      type: "ADD",
      blog: { title: formData.title, content: formData.content },
    });

    const docRef = await addDoc(collection(db, "blogs"), {
      title: formData.title,
      content: formData.content,
    });

    setFormData({ title: "", content: "" });
    titleRef.current.focus();
    console.log(blogs);
  }

  function removeBlog(index) {
    // setBlogs(blogs.filter((blog, i) => index !== i));
    dispatch({ type: "DELETE", index: index });
  }

  return (
    <>
      <h1>Write a blog</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter your title here.."
              value={formData.title}
              ref={titleRef}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content goes here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ content: e.target.value, title: formData.title })
              }
              required
            />
          </Row>
          <button className="btn">Add</button>
        </form>
      </div>
      <hr />
      <h2>Blogs</h2>
      {blogs.map((blog, index) => (
        <div className="blog" key={index}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-btn">
            <button className="btn remove" onClick={() => removeBlog(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
