import React ,{useState ,useEffect ,useRef} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import { Button ,Table ,Modal ,Form ,Col } from "react-bootstrap";
import moment from 'moment';
import './listdevicechoduyet.scss'
import Header from "../Header/Header"
function ListDeviceChoDuyet() {
      
  const token =  Cookies.get('cookielogin')
  const history = useHistory()
  const [listData , setListData] = useState(null)
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [id ,setId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const [render,setRender]= useState(false);
  const [listNhom,setListNhom]= useState(null);
  const [nhom ,setNhom] = useState(0)
  const [nameseach , setnamesearch]= useState('');
  useEffect(async()=>{
      
    await axios.get("http://localhost:5000/api/listdevicechoduyet" ,{headers: {Authorization: `Bearer ${token}`} }).then((res)=>{

      setListData(res.data.msg)
      
  }).catch(err=>{
    if(err.response.data.message ==="erroruser"){
        history.push("/login") ;
     }
    if( err.response.data.message === "errorrole" ){
    
       history.push("/login") ;
      }

  })

  await axios.get("http://localhost:5000/api/getnhomdivice",  {
    headers: { Authorization: `Bearer ${token}` }
  }).then((res) => {
    setListNhom(res.data);
  }).catch((err) => {
    if(err.response.data.message ==="erroruser"){
       history.push("/login") ;
     }
    if( err.response.data.message === "errorrole" ){
    
       history.push("/login") ;
      }
  });

  },[render])


  const handleShowdy  = (e)=>{
    console.log(e)
    setId(e)
    setShow1(true)
  }

 

  const  handleDelete  =(e)=>{
    setId(e)
    setShow(true);
  }

  const handlehuy = async()=>{

    await axios.get(`http://localhost:5000/api/huylistdevicechoduyet/${id}` ,{headers: {Authorization: `Bearer ${token}`} }).then((res)=>{
   toast.success(res.data.msg)
   setRender(!render)
   setShow(false)
  }).catch(err=>{

    if(err.response.data.message ==="erroruser"){
        history.push("/login") ;
     }
    if( err.response.data.message === "errorrole" ){
    
       history.push("/login") ;
      }

  })}

  const handledy  = async()=>{
    await axios.get(`http://localhost:5000/api/dylistdevicechoduyet/${id} `, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
   toast.success(res.data.msg)
   setRender(!render)
   setShow1(false)
   
  }).catch(err=>{
    if(err.response.data.message ==="erroruser"){
        history.push("/login") ;
     }
    if( err.response.data.message === "errorrole" ){
    
       history.push("/login") ;
      }
   

  })}

  const handleSearchDeviceChoduyet = async()=>{
    const data = {
      nameseach:nameseach,
      nhom:nhom
    }
    await axios.post("http://localhost:5000/api/searchdevicechoduyet",data , {headers: {Authorization: `Bearer ${token}` }}).then((res)=>{
    setListData(res.data.listDevice)
    }).catch(err=>{
      console.log(err.response.data)
      if(err.response.data.message ==="erroruser"){
        return  history.push("/login") ;
       }
      if( err.response.data.message === "errorrole" ){
      
       return  history.push("/login") ;
        }
    
    })
  }
  
  return(
<div className="ListDeviceChoDuyet">
<Slibar/>
<ToastContainer
position="top-right"
autoClose={3000}
closeOnClick/>


<div className="main-content">
<Header/>
<div className="inputsearchdevicechoduyet">
        <Col xs={5} >
                      <Form.Control placeholder="T??m ki???m thi???t b???" onChange = {(e)=>setnamesearch(e.target.value)} />
                     
                    </Col>
                    <select name="" id="" className="selectnhom" onChange = {(e)=>setNhom(e.target.value)}>
                        <option value="0">T???t c??? nh??m</option>
                         {listNhom === null ?"data ..": listNhom.map((nhom ,index)=>{return(
     <option value={nhom.id} key={index}>{nhom.Name}</option>
   )})} 
                      </select> 
                    
                    <button type="button" className="btn btn-success buttonsearch" onClick={()=>handleSearchDeviceChoduyet()}>
                    <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                    </button>
        </div>

        <div className="listdevicemuonchoduyet">
        <table>
   

<tr>
    <th>STT</th>
    <th>Email</th>
    <th>T??n thi???t b???</th>
    <th>S??? l?????ng m?????n </th>
    <th>???nh thi???t b???</th>

    <th>Th???i gian tr???</th>
    <th>Th???i gian m?????n</th>
    <th>Ph??  duy???t</th>
    <th>T??? ch???i</th>
  </tr>
  {listData ===null ? "Loadding...." : listData.map((data1 ,index)=>{
     return( 

     <tr key={data1.id}>
       <td>{index}</td>
       <td>{data1.User.email}</td>
        <td>{data1.Device.namedevice}</td>
        <td>{data1.numberm}</td>
       
        <td > <img src={"http://localhost:5000/src/uploads/"+data1.Device.imgdevice}  alt="" className="imgpicture"/></td>
        <td > {( data1.datetra).slice(0, 10)}  </td>
        <td > {( data1.createdAt).slice(0, 10)}  </td>
        <td  > <Button onClick={()=>handleShowdy(data1.id)}>?????ng ?? </Button>  </td>
        <td  > <Button onClick={()=>handleDelete(data1.id)} >T??? ch???i </Button>  </td>
    
  
  </tr>     ) })
}


</table>
        </div>



        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>T??? ch???i cho m?????n</Modal.Title>
        </Modal.Header>
        <Modal.Body> B???n c?? ch???c t??? ch???i cho m?????n kh??ng!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlehuy}>
            ?????ng ??
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>B???n ?????ng  ?? cho m?????n</Modal.Title>
        </Modal.Header>
        <Modal.Body> B???n c?? ch???c  ?????ng ?? cho m?????n kh??ng !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handledy}>
            ?????ng ??
          </Button>
        </Modal.Footer>
      </Modal>

 

    </div>
  )

       

  }

     

export default ListDeviceChoDuyet