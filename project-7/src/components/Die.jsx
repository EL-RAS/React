import React from 'react';


function Die(prop) {

  const style = {
    backgroundColor: "#00fc1d",
  }

  return (
    <div className='boxes' style={prop.isHeld ? style : {}} onClick={prop.holdDice}>
      <h1>{prop.number}</h1>
    </div>
  )
}

export default Die;
