import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './index.css';
import axios from 'axios';
function Home() {
  const navigate = useNavigate();
  const [transactions,settransactions] = useState([]);
  const [load,setload] = useState(0);
  const [modal,setmodal] = useState(false);
  const [transactionName,settransactionName] = useState("");
  const [amount,setamount] = useState(0);
  const [date,setdate] = useState("");
  const [category,setcategory] = useState("");
  const [type,settype] = useState("income");
  const bubbleSort = (array) => {
    let flag = false;
    for(var i = 0; i <= array.length-1; i++){
        flag = false;
        for(var j = 0; j < ( array.length - i -1); j++){
            let m1 = array[j]["date"][5] + array[j]["date"][6];
            let m2 = array[j+1]["date"][5] + array[j+1]["date"][6];
            let d1 = array[j]["date"][8] + array[j]["date"][9];
            let d2 = array[j+1]["date"][8] + array[j+1]["date"][9];
            if(Number(m1) === Number(m2)){
                if(Number(d1) < Number(d2)){
                    var temp = array[j]
                    array[j] = array[j + 1]
                    array[j+1] = temp
                    flag = true;
                }
            }
            else if(Number(m1) < Number(m2)){
                var temp = array[j]
                array[j] = array[j + 1]
                array[j+1] = temp
                flag = true;
            }
        }
        if(!flag){
            console.log(array)
            return;
        }
    }
  }
  useEffect(() => {
    fetch('http://127.0.0.1:8000/user/show').then(res => res.json()).then((res) => {
        var temp = []
        var count = 0;
        console.log(res);
        bubbleSort(res["resp"]);
        res["resp"].forEach(item => {
            if(count > 5) return;
            const ele = <tr id = "table-row" key={count}>
                <td>{item["name"]}</td>
                <td style={item["type"] === "expense" ? {color:"red"} : {color:"green"}} >{item["amount"]}</td>
                <td>{item["date"]}</td>
                <td>{item["category"]} </td>
            </tr>
            temp = [...temp,ele];
            count++;
        });
        settransactions(temp);
    })
  },[load])
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
            </div>
        </Left>
        <Right>
            <Firsthalf>
                {/* <div id = "rfh1"> */}
                <img src = "https://img.icons8.com/color/512/kakashi-hatake.png" alt = ""></img>
                <p id = "hey">Hey there,</p>
                <p id = "bestofluck">Best of luck tracking your expenses</p>
                <div id = "card1">
                    <div id = "tb">
                        <div>Total Balance : </div>
                        <div>1000$</div>
                    </div>
                    <div id = "spent-rem">
                        <div id = "spent">
                            <div>Spent : </div>
                            <div>400$</div>
                        </div>
                        <div id = "rem">
                            <div>Remaining : </div>
                            <div>600$</div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Firsthalf>
            <Secondhalf> 
                <Card>
                    <div id = "transaction">
                        <div >Transaction Name : </div>
                        <input id = "i1" onChange={(event) => {settransactionName(event.target.value)}}></input>
                    </div>
                    <div id = "amountpaid">
                        <div>Amount : </div>
                        <input id = "i2" onChange={(event) => {setamount(event.target.value)}}></input>
                    </div>
                    <div id = "date">
                        <div>Date : </div>
                        <input id = "i3" type = "date" onChange={(event) => {setdate(event.target.value)}}></input>
                    </div>
                    <div id = "cat">
                    <label for="cat">Category : </label>
                    <select id="cati" name="category" onChange={(event) => {setcategory(event.target.value)}}>
                    <option value="groceries">Groceries</option>
                    <option value="clothes">Clothes</option>
                    <option value="dining">Dining</option>
                    <option value="Travel">Travel</option>
                    <option value="Stationary">Stationary</option>
                    <option value="others">Others</option>
                    </select>
                    </div>
                    <div id = "type">
                        <label for = "type">Type : </label>
                        <select id = "typei"  name = "type" onChange={(event) => {settype(event.target.value)}}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="transfer">Transfer</option>
                        </select>
                    </div>
                    <button onClick={() => {
                        axios.post('http://127.0.0.1:8000/user/add',{
                            "name":transactionName,
                            "amount":amount,
                            "date":date,
                            "category":category,
                            "type":type
                        })
                        console.log(transactionName,amount,date,category,type);
                        setload(load => load+1);
                    }}>Add Transaction</button>
                </Card>
                <RecentTransaction>
                <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Transaction Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                </tr>
            </thead>
            <tbody>
                {transactions}
            </tbody>
            </table>
                </RecentTransaction>
            </Secondhalf>
        </Right>
    </Page>
  )
}
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
    flex-direction:row;
    background-color:white;
    width:75vw;
    height:92vh;
    margin-top:4vh;
    margin-bottom:4vh;
    border-radius:20px;
`;
const Firsthalf = styled.div`
    width:45%;
    height:100%;
    display:flex;
    padding-left:2vw;
    flex-direction:column;
    align-items:flex-start;
    img{
        height:100px;
        width:100px;
        margin-top:7vh;
    }
    #hey{
        font-weight:bold;
        font-size:32px;
        margin-top: 0px;
        margin-bottom: 5px;
    }
    #bestofluck{
        font-size:10px;
        margin-top:0px;
        color:grey;
    }
    #total{
        margin-bottom:10px;
    }
    #amount{
        margin-top:0px;
        color:green;
    }
    #card1{
        transform:translateX(-40px);
        display:flex;
        flex-direction:column;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        align-items:flex-start;
        border:1px solid black;
        background: linear-gradient(125.93deg, #203080 28.99%, rgba(89, 110, 185, 0) 103.13%);
        width:70%;
        height:25vh;
        color:white;
        padding-left:1pc;
        border-radius:20px;
        margin-top:7vh;
        font-size:16px;
    }
    #spe-rem{
        display:flex;
        flex-direction:row;
        height:10vh;
        width:100%;
        margin-top:10px;
        transform:translateX(-30px);
    }
    #tb{
        margin-top:3vh;
    }
    #spent,#tb,#rem{
        display:flex;
        flex-direction:row;
        margin-bottom:25px;
    }
    
    margin-left:8%;
`;
const Secondhalf = styled.div`
    width:60%;
    height:100%;
    padding-right:6vw;
`;
const Card = styled.div`
    width:80%;
    margin-right:auto;
    margin-top:5vh;
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
const RecentTransaction = styled.div`
    margin-top:8vh;
    #columns{
        display:flex;
        flex-direction:row;
        font-size:12px;
        color:grey;
    }
    #headTrans{
        margin-bottom:20px;
    }
    #transname{
        margin-right:100px;
        margin-left:20px
    }
    #Amount{
        margin-right:30px;
    }
    #Date{
        margin-right:30px;
    }
    #category{
        margin-right:25px;
    }
`;
export default Home