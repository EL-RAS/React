import React from "react";
// import memesData from "../memesData";

const Meme = () => {
   const [meme, setMeme] = React.useState({
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
   });

   const [allMeme, setAllMeme] = React.useState([]);

   React.useEffect(() => {
      // fetch("https://api.imgflip.com/get_memes")
      // .then((res) => res.json())
      // .then((data) => setAllMeme(data.data.memes));
      async function getMeme () {
         const res = await fetch("https://api.imgflip.com/get_memes");
         const data = await res.json();
         setAllMeme(data.data.memes);
      }
      getMeme()
   }, [])

   function getMemeImage() {
      const myDataArray = allMeme;
      const randomIndex = Math.round(Math.random() * myDataArray.length);
      const url = myDataArray[randomIndex].url;
      setMeme((prevMeme) => ({ ...prevMeme, randomImage: url }));
   }

   function handleText (event) {
      setMeme((prevMeme) => ({...prevMeme, [event.target.name]: event.target.value }));
   }

   return (
      <main>
         <div className="form">
            {/* <label htmlFor="">Top text</label> */}
            <input 
               type="text" 
               name="topText" 
               placeholder="Shut up" 
               onChange={handleText}
               value={meme.topText}
            />
            {/* <label htmlFor="">Bottom text</label> */}
            <input
               type="text"
               name="bottomText"
               placeholder="And take my money"
               onChange={handleText}
               value={meme.bottomText}
            />
            <button onClick={getMemeImage}>Get a new meme image 🖼</button>
         </div>
         <div className="meme">
         <img src={meme.randomImage} alt="meme image" className="meme-image" />
            <h2 className="meme-text top">{meme.topText}</h2>
            <h2 className="meme-text bottom">{meme.bottomText}</h2>
         </div>
      </main>
   );
};

export default Meme;
