import React , {useEffect, useState } from 'react'
import '../../__Static/__Home/Home.css'
import DrawAnnotations from './DrawAnnotations';


function Home() {
    const [selectFile , setSelectFile] = useState({});
    const [fileName , setFileName] = useState("");
    const [img , setImg] = useState([])
    const [getFiles , setGetFiles] = useState({"fileName":"abc.jpg" ,"fileUrl":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"});
    const [loading , setLoading] = useState(true);

    //handle the onChange file
    const selectFileHandler = async (e)=>{
        let image = e.target.files[0];
        setFileName(image.name);
        setSelectFile(URL.createObjectURL(image));
        document.getElementById("preview_img").style.display = "flex"
    }

    // function for uploading the image
    const fileUploadHandler = async (e)=>{
        e.preventDefault()
        let file = {
            "fileName":fileName,
            "fileUrl":selectFile
        }
        img.push(file);
        localStorage.setItem('images', JSON.stringify(img));
        setGetFiles(JSON.parse(localStorage.getItem('images') || "[]"))
        document.getElementById("preview_img").style.display = "none"
        // console.log(img)
       
    }


    // react hook to fetch the data of the images from the localStorage
    useEffect (async()=>{
        setGetFiles(JSON.parse(localStorage.getItem('images') || "[]"))
        setLoading(false)
    },[])


    // changing the image on click 
    const changeImage = (e)=>{
        e.preventDefault();
        const link = e.target.currentSrc;
        document.getElementById("large_image").src = link;
        document.getElementById("file_name_heading").innerText = "Current Image : "+ e.target.id;
        localStorage.setItem('current_image' , JSON.stringify(e.target.id))
    }



    // wait for loading the DOM
    if(loading)
    return<>Loading..</>

    return (
        <div>
            <p id ="file_name_heading" ></p>
            <div className='home_container'>
                <div className='image_container'>
                    <DrawAnnotations />
                    <div id="panel" className='image_large'>
                        <img id="large_image"  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"/>
                    </div>
                </div>
                <div className='files_container'>
                    
                    <div className='file_submit'>
                        <button onClick={fileUploadHandler}>
                        Upload file</button>
                        <img id="preview_img" style={{ justifyContent:"center",margin:"auto",top:"5%",position:"relative" ,width:"150px" , height:"100px" , display:"none"}} alt='Preview' src={selectFile} />
                        <input type="file" 
                        onChange={selectFileHandler}
                        accept='image/*' id="chooseFile"/>
                    </div>
                </div>
                <div className='image_in_queue'>
                    {
                        getFiles.map(image=>{
                            return(
                                <>
                                    <div>
                                        <img id={image.fileName} onClick={changeImage}  src={image.fileUrl} /><br/>
                                        <span >{image.fileName}</span>
                                    </div>
                                    
                                </>
                            )
                        })
                    }
            </div>
            </div>
            
        </div>
    )
}

export default Home
