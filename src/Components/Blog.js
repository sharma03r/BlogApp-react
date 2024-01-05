import { useState, useRef } from "react";

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
    console.log(blogs);
  }

  function removeBlog(index) {
    setBlogs(blogs.filter((blog, i) => index !== i));
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
              placeholder="Content goes here.."
              value={formData.content}
              onChange={(e) =>
                setFormData({ content: e.target.value, title: formData.title })
              }
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
