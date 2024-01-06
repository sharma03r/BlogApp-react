import { useState, useRef, useEffect } from "react";
import { db } from "./firebaseInit";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const titleRef = useRef(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    titleRef.current.focus();
  }, []);
  useEffect(() => {
    // async function fetchData() {
    //   const snapshot = await getDocs(collection(db, "blogs"));
    //   console.log(snapshot.docs);
    //   const blogs = snapshot.docs.map((doc) => {
    //     return {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //   });
    //   console.log(blogs);
    //   setBlogs(blogs);
    // }
    // fetchData();
    const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    //setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

    const docRef = await addDoc(collection(db, "blogs"), {
      title: formData.title,
      content: formData.content,
    });
    console.log(`Document created with id ${docRef.id}`);
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
    console.log(blogs);
  }

  async function removeBlog(id) {
    //setBlogs(blogs.filter((blog, i) => index !== i));
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);
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
            <button className="btn remove" onClick={() => removeBlog(blog.id)}>
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
