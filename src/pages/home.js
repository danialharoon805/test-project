import React, {useState, useEffect} from "react";
import axios from 'axios'
import NewsCard from "../component/NewsCard";

function About() {

  const [newsPosts, setNewsPosts] = useState();

  const [change, setchange] = useState(true)

  const handleChange = () => {

    setchange(true)

  }

  useEffect(() => {

    const uniqueId = localStorage.getItem('unique_user_id');

    if (!uniqueId) {
      const d = new Date();
      localStorage.setItem('unique_user_id', d.getTime())
    }

    ;(async () => {
     
      var config = {
        method: 'get',
        url: 'http://localhost:3010/api/v1/news-post',
        
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.success, "success");
        if (response.data.success) {
          setNewsPosts(response.data.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    })()

    setchange(false);
    
  }, [change])

  console.log(newsPosts, "posts")


  return (
    <>
      {newsPosts && newsPosts.map((post) => (
        <NewsCard key={post.id} {...post} onChange = {handleChange} />
      ))}
    </>
  );
}
export default About;