import { useState, useEffect } from 'react'
import './App.css'
import  Imagebank from'./imagebank.jsx'



function App() {
  const [imageArr, setImageArr] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null)
  const [color, setColor] = useState({
    r: '255',
    g: '255',
    b: '255',
    a: '100',
  });



  function handleImageChange(event) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      setImageArr(prevImages => [...prevImages, newImage]);
    }
  }

  function selectImg(index)
  {
    setSelectedImage(index)
  }

  function removeImg() {
    if (selectedImage !== null) {
      setImageArr(prevImages => prevImages.filter((_, index) => index !== selectedImage));
      setSelectedImage(null);
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }, [color])
  
  return (

    <div>
      <div>
        <div>
          <Imagebank 
            imageArr = {imageArr}
            handleImageChange= {handleImageChange}
            removeImg={removeImg}
            selectImg={selectImg}
            selectedImage = {selectedImage}
            color={color}
            setColor={setColor}
          />
          </div>
      </div>
    </div>

  )
}

export default App
