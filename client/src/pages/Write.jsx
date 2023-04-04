import axios from 'axios';
import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
//For rich text
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

const Write = () => {

  const navigate = useNavigate();
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || ""); //descriptions (if editing existing, use old title, otherwise use empty for new) 
  const [title, setTitle] = useState(state?.title || ""); //title
  const [file, setFile] = useState(null); //img
  const [cat, setCat] = useState(state?.cat || ""); //cat

  const upload = async () => {
    try{
      const formData = new FormData(); 
      formData.append("file", file);
      const res = await axios.post("../../public/uploads", formData);
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title, 
        desc: value, 
        cat, 
        img:file.name ? imgUrl : "",
      }) : await axios.post(`/posts/`, {
        title, 
        desc: value, 
        cat, 
        img:file.name ? imgUrl : "", 
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=> setTitle(e.target.value)}/>
        <div className="editorContainer">
          {/* rich text */}
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visisiblity: </b> Public
          </span>
          <input style={{display:"none"}} type="file" id="file" name='' onChange={(e) => setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=> setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e=> setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="cat" value="technologgy" id="technologgy" onChange={e=> setCat(e.target.value)}/>
            <label htmlFor="technologgy">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e=> setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e=> setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e=> setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write