import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    const fetchData = async ()=> {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit",
    //       desc: "amet consectetur ad",
    //       img: "https://picsum.photos/1000/600"
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit",
    //       desc: "amet consectetur ad",
    //       img: "https://picsum.photos/1000/600"
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit",
    //       desc: "amet consectetur ad",
    //       img: "https://picsum.photos/1000/600"
    //     },
    //     {
    //       id: 4,
    //       title: "Lorem ipsum dolor sit",
    //       desc: "amet consectetur ad",
    //       img: "https://picsum.photos/1000/600"
    //     },
    //   ]

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className="post" key={post.id}>
                <img src={`../uploads/${post?.img}`} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu