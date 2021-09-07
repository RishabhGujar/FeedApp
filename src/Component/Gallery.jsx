import Masonry from 'react-masonry-css'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { useState } from 'react';
import {AiFillLike} from "react-icons/ai";
import {HiOutlineShare} from "react-icons/hi";


import 'react-spring-bottom-sheet/dist/style.css';
const breakpoints={
    default: 3,
    1100: 2,
    700: 2,
    500: 1
}

function Gallery(props){
    const {data,sort} = props;
   
    return   <Masonry
    breakpointCols={breakpoints}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
       
       {(sort === "date" ? data.sort((a,b)=>{
        let d1 = new Date(a.event_date*1000);
        let d2 = new Date(b.event_date*1000);
        return d2 - d1 }) : 

        data.sort((a,b)=>b[sort]- a[sort])).map((el,index)=>{
        
        return <div>
           <GalleryItems srcI={el.thumbnail_image} key={index} likes={el.likes} share={el.shares} views={el.views} date={el.event_date} />
       </div>}

      )} 
      
   </Masonry>
}


function GalleryItems(props){
    const {srcI,likes,share,views,date} = props
    const [open, setOpen] = useState(false)
    function handleClick(){
        setOpen(true);
    }
    return <>
       <div>
         <button onClick={handleClick} className="btn">
       <img src={srcI} alt="altenatte" className="some" onError={(e)=>{e.target.onerror = null;e.target.src ="https://i.redd.it/6rxcnb9f4nr21.jpg"}} />
          </button>
          
          <div className="shareContainer">
             <div className="bottomStyles">
             <AiFillLike/> {likes}
             
             </div>
          
             <div className="bottomStyles">
             <HiOutlineShare/> {share}
             </div>
          </div>
       </div>
       
       
       
       
      
       <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        blocking={false}
        snapPoints={({ maxHeight }) => [maxHeight/3 , maxHeight * 10]}
      >
       <div className="bottom">
        <p className="bottomStyles">
          shares : {share}
        </p>
        <p className="bottomStyles">Likes {likes}</p>
        <p className="bottomStyles"> 
           Views : {views}
        </p>
        <p className="bottomStyles">
          Date : {new Date(date*1000).toLocaleString()}
        </p>
        </div>
      </BottomSheet>
       </>
}

export {Gallery};