import React , {useState} from 'react'
import { Stage, Layer, Rect } from "react-konva";
import $ from 'jquery'

const DrawAnnotations = ()=> {


  // code for rectangle drawing and dimension
    const [annotations, setAnnotations] = useState([]);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const [dimension , setDimension] = useState({});

    const handleMouseDown = event => {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, rectangle: "0" , color:'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }]);
      }
    }; 
  
    const handleMouseUp = event => {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          rectangle: "Rectangle No. - " + (annotations.length + 1),
          color:'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
        };
        annotations.push(annotationToAdd);
        setNewAnnotation([]);
        setAnnotations(annotations);
      }
    };
  
    const handleMouseMove = event => {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            rectangle: "0",
            color:'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
          }
        ]);
      }
    };


    const drawRectangleHandler =()=>{
        $("#canvas").css({display:"block"});
        $("#draw_rect_icon").css({background:"black" ,padding:"5px" , borderRadius:"5px" , color:"white"})

    }

    const erase_tool = ()=>{
        $("#erase_rect_icon").css({background:"black" ,padding:"5px" , borderRadius:"5px" , color:"white"})

    }

    const drag_and_move =()=>{
        $("#drag_icon").css({background:"black" ,padding:"5px" , borderRadius:"5px" , color:"white"})
       
    }


     //export the detail of the rectangles
     const exportDetailHandler = async(e)=>{

        const detail_dimension = {
            "imageName" : JSON.parse(localStorage.getItem('current_image')),
            "rectangle" : annotations 
        }
        setAnnotations([])
        localStorage.setItem("dimensions" , JSON.stringify({detail_dimension}));

        const res = await fetch('/export' , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({detail_dimension})
        })
        await res.json();
      
    }

    const annotationsToDraw = [...annotations, ...newAnnotation];

    

    return (
        <div>
        <div style={{display:"flex", position:"absolute"}}>
            <div className='icon_container'>
                    <span><i class="material-icons" id="drag_icon"
                    onClick={drag_and_move}
                    >open_with</i></span>
                    <span><i class="material-icons" id="draw_rect_icon"
                    onClick={drawRectangleHandler}
                    >format_shapes</i></span>
                    <span><i class="material-icons" id="erase_rect_icon"
                    onClick={erase_tool}
                    >explicit</i></span>

            </div>
            <div   id='canvas' style={{position:"absolute",display:"none"}}>
                <Stage
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                width={600}
                height={400}
                >
            <Layer>
                {annotationsToDraw.map(value => {
                return (
                        <Rect
                            x={value.x}
                            y={value.y}
                            width={value.width}
                            height={value.height}
                            fill="transparent"
                            stroke={value.color}
                            draggable
                            
                          // onDragEnd={(e) => {
                          //   onChange({
                          //     ...shapeProps,
                          //     x: e.target.x(),
                          //     y: e.target.y(),
                          //   });
                          // }}
                          // onTransformEnd={(e) => {
                          //   // transformer is changing scale of the node
                          //   // and NOT its width or height
                          //   // but in the store we have only width and height
                          //   // to match the data better we will reset scale on transform end
                          //   const node = shapeRef.current;
                          //   const scaleX = node.scaleX();
                          //   const scaleY = node.scaleY();

                          //   // we will reset it back
                          //   node.scaleX(1);
                          //   node.scaleY(1);
                          //   onChange({
                          //     ...shapeProps,
                          //     x: node.x(),
                          //     y: node.y(),
                          //     // set minimal value
                          //     width: Math.max(5, node.width() * scaleX),
                          //     height: Math.max(node.height() * scaleY),
                          //   });
                          // }}
                        />
                        );
                })}
            </Layer>
            </Stage>
        </div>
        </div>
        <button className='export_btn'
        onClick={exportDetailHandler}>Export
        </button>
        </div>
    )
}


export default DrawAnnotations;
