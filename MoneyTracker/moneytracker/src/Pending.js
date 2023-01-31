import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function Pending() {
  const navigate = useNavigate();
  const [name,setname] = useState("");
  const [amount,setamount] = useState("");
  const [mobile,setmobile] = useState("");
  const [type,settype] = useState("");
  const [reload,setreload] = useState(0);
  const [show,setshow] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/show_pending').then(res => {
        let data = res.data["resp"];
        let temp = [];
        data.forEach(item => {
          const ele = <tr key = {item["id"]}>
              <td>{item["name"]}</td>
              <td>{item["amount"]}</td>
              <td>{item["mobile"]}</td>
              <td>
                {item["type"] == "to_send" ? 
                <div>
                  <Button variant="primary" onClick = {() => {
                            fetch('http://127.0.0.1:8000/user/del_pending/'+item["id"]);
                            setreload(reload => reload+1);
                        }}>Send</Button>
                </div> 
                : 
                <div>
                  <Button variant="info" onClick = {() => {
                            fetch('http://127.0.0.1:8000/user/del_pending/'+item["id"]);
                            setreload(reload => reload+1);
                        }}>Recieve</Button>
                </div>
                }
              </td>
          </tr>
          temp = [...temp,ele];
        })
        setshow(temp);
    })
  },[reload])
  return (
    <Page>
        <Left>
            <div id = "menu">
            <div id = "home" onClick={() => {
                navigate('/home');
            }}>
                <img src = "https://img.icons8.com/fluency/2x/four-squares.png" alt="home"></img>
                <p>Home</p>
            </div>
            <div id = "trans-hist" onClick={() => {
                navigate('/history');
            }}>
                <img src = "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/2x/external-transaction-history-online-money-service-flaticons-lineal-color-flat-icons-2.png" alt = "trans-hist"></img>
                <p>Transaction History</p>
            </div>
            <div id = "pend-hist" onClick={() => {
                navigate('/pending');
            }}>
                <img src = "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/2x/external-hour-glass-measurement-icongeek26-linear-colour-icongeek26.png" alt = "pend-hist"></img>
                <p>Pending Transaction</p>
            </div>
            </div>
        </Left>
        <Right>
                <Card>
                    <div id = "transaction">
                        <div >Name : </div>
                        <input id = "i1" onChange={(event) => {setname(event.target.value)}}></input>
                    </div>
                    <div id = "amountpaid">
                        <div>Amount : </div>
                        <input id = "i2" onChange={(event) => {setamount(event.target.value)}}></input>
                    </div>
                    <div id = "amountpaid">
                        <div>mobile : </div>
                        <input id = "i2" onChange={(event) => {setmobile(event.target.value)}}></input>
                    </div>
                    <div id = "type">
                        <label for = "type">Type : </label>
                        <select id = "typei"  name = "type" onChange={(event) => {settype(event.target.value)}}>
                        <option value="send">Send</option>
                        <option value="recieve">Recieve</option>
                        </select>
                    </div>
                    <button onClick={() => {
                        axios.post('http://127.0.0.1:8000/user/add_pending',{
                            "name":name,
                            "amount":amount,
                            "mobile":mobile,
                            "type":type
                        })
                        setreload(reload => reload+1);
                    }}>Add Transaction</button>
                </Card>
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Mobile</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {show}
            </tbody>
            </table>
    </Right>
    </Page>
  )
}
const Card = styled.div`
    width:42%;
    margin-right:auto;
    margin-top:5vh;
    margin-left:auto;
    padding:20px;
    border:solid 1px black;
    font-weight:bold;
    border-radius:10px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    #transaction,#amountpaid,#date,#cat,#type{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        margin-bottom:7px;
    }
    #transaction{
      input{
        margin-left:90px;
      }
    }
    input,select{
        margin-right:auto;
        margin-left:12px;
    }
    #i2{
        margin-left:80px;
    }
    #i3{
        margin-left:105px;
    }
    #cati{
        margin-top:4px;
        margin-left:76px;
    }
    #typei{
        margin-left:106px;
    }
    button{
        width:90%;
        height:35px;
        background-color:#98CEFF;
        color:white;
        margin-top:15px;
        &:hover{
            transform:scale(1.1);
        }
    }
`;
const Trans = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100vw;
`;
const Page = styled.div`
    display:flex;
    flex-direction:row;
    width:100vw;
    height:100vh;
    background-color:#E3F2FF;
`;
const Left = styled.div`
    display:flex;
    flex-direction:column;
    background-color:#E3F2FF;
    width:18vw;
    cursor:pointer;
    #home,#trans-hist,#pend-hist{
        display:flex;
        flex-direction:row;
        font-size:13px;
        align-items:center;
        margin-left:3vw;
        margin-bottom:5px;
        &:hover{
            background-color:lightblue;
            color:white;
        }
    }
    p{
        margin-top:8px;
    }
    #menu{
        margin-top:10vh;
    }
    img{
        height:30px;
        width:30px;
        margin-right:5px;
    }
`;
const Right = styled.div`
    display:flex;
    flex-direction:column;
    background-color:white;
    width:75vw;
    height:92vh;
    margin-top:4vh;
    margin-bottom:4vh;
    border-radius:20px;
    table{
      margin-top:20px;
      margin-left:auto;
      width:80%;
      margin-right:auto;
      text-align:left;
    }
`;
export default Pending