import React, { useState, useEffect,  } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import Slibar from "../slibar/slibar.js";
import { useHistory } from "react-router-dom";
import "./ttdevice.css";
import Header from "../Header/Header"
function Tinhtrangthietbimuon() {
  const token = Cookies.get("cookielogin");
  const [listdata ,setListData] = useState(null)
   const [loading , setLoading] = useState(false)
  const history = useHistory()
  useEffect(async () => {
    await axios.get("http://localhost:5000/api/showdeviceyou", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setListData(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
       
      });
  }, [loading]);
  
 
  const handleDelete = async(id)=>{
    console.log(id)
    await axios.delete(`http://localhost:5000/api/deletetingtrang/${id}` , { headers: { Authorization: `Bearer ${token}` }} ).then((res)=>{
      toast.success("Xóa tình trạng bị từ chối thành công");
      setLoading(!loading)
     }).catch(err=>{   
      if(err.response.data.message ==="erroruser"){
        return  history.push("/login") ;
       }
})
  }

  return (
    <div className="ListDeviceTT">
      <Slibar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
      <div className="main-content">
      <Header/>

        <div className="listdeviceCheck">
          <table>
            <tr>
              <th>STT</th>
              <th>Tên thiết bị</th>
              <th>Ảnh thiết bị</th>
              <th>Số lượng thiết bị </th>
              <th>Thời gian mượn</th>
               <th>Thời gian trả</th>
               <th>Trạng Thái   </th>
            </tr>
{
    listdata  === null ? "Chưa có dữ liệu":listdata.map((data1 ,index)=>{
        return( 
            <tr key={data1.id}>
   <td>{index}</td>
   <td>{data1.Device.namedevice}</td>
   <td><img src={"http://localhost:5000/src/uploads/"+data1.Device.imgdevice}  alt="" className="imgavatar"/></td>
   <td>{data1.numberm}</td>

   <th>{(data1.createdAt).slice(0, 10)}</th>
   <th>{(data1.datetra).slice(0, 10)}</th>
   <th>{ (data1.trangthai === 2)?   <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => handleDelete(data1.id)}
                        > (Bị từ chối) </i>   :((data1.trangthai === 1)? <p style={{color:"green"}}>Đang Mượn</p> : <p style={{color:"yellow"}}>Chưa duyệt </p>)}</th>
   </tr>     
          

        )
    })
}


          </table>
        </div>
      </div>
    </div>
  );
}
export default Tinhtrangthietbimuon;
