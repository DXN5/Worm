import React from 'react';

function Fruit(props) {

    const style = {
        left: props.part[0],
        top: props.part[1]
    }

  return (
    <div className='fruit' style={style}></div>
  )
}

export default Fruit