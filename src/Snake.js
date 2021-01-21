import React from 'react'

export default (props) => {
        
        const get_last_item = props.snakeDots.length-1; 
        
        return (
                <div>
                {
                    
                    props.snakeDots.map((dot, i)=>{
                        const style = {
                            left: `${dot[0]}%`,
                            top:`${dot[1]}%`
                        }
                        
                        return( 
                            (get_last_item==i)?(<div className="snake-dot head" key={i} style={style}></div>):(<div className="snake-dot" key={i} style={style}></div>)
                        )
                    })
                }
                </div>
        )
}

