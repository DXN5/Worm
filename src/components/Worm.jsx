import React from 'react';

function Worm(props) {  

  return ( 
  <div>
    {props.wormParts.map((part, i) => {
      const style = {
        left: part[0],
        top: part[1]
      }
      return(
        <div className='worm' key={i} style={style}></div>
      )
    })}
  </div>
  )
}

export default Worm