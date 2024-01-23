import React, { useState } from "react";
import Colorpicker from './Colorpicker.jsx'


export default function Imagebank(props) {
  const [positions, setPositions] = useState({});
  const [draggedImage, setDraggedImage] = useState(null);

  const handleMouseDown = (event, index) => {
    event.preventDefault();
    event.stopPropagation(); 
    setDraggedImage({
      index: index,
      startPos: {
        x: event.clientX - (positions[index]?.x || 0),
        y: event.clientY - (positions[index]?.y || 0)
      }
    });
  };

  const handleMouseUp = (event) => {
    setDraggedImage(null);
  };

  const handleMouseMove = (event) => {
    if (draggedImage !== null) {
      event.preventDefault();
      event.stopPropagation();
      setPositions(prevPositions => ({
        ...prevPositions,
        [draggedImage.index]: {
          x: event.clientX - draggedImage.startPos.x,
          y: event.clientY - draggedImage.startPos.y
        }
      }));
    }
  };


  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const bankElements = props.imageArr.map((image, index) => {
    const position = positions[index] || { x: 50, y: 50 };
    const isSelected = props.selectedImage === index;
    const style = {
      position: 'absolute',
      left: position.x,
      top: position.y,
      boxShadow: isSelected ? '0 0 20px white' : 'none',
    };

    return (
      <div className="image" key={index} style={style}>
        <img
          draggable="true"
          src={URL.createObjectURL(image)}
          width="200"
          onMouseDown={(e) => {handleMouseDown(e, index), props.selectImg(index)}}
        />
      </div>
    );
  });


  return (
    <div className="imagebank">
      <ul>
        <li><img className="logo" src="src\images\IMG_8101.PNG"/></li>
        <li><input className="choosefile" type="file" name="myImage" onChange={props.handleImageChange} /></li>
        <li><button className="remove-button" onClick={() => props.removeImg()}> remove </button></li>
        <li><Colorpicker color= {props.color} setColor={props.setColor}/></li>
      </ul>
      <div>{bankElements}</div>
    </div>
  );
}
