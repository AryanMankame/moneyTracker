import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './index.css';
import { useNavigate } from 'react-router-dom';
function TransactionHistory() {
  const [transactions,settransactions] = useState([]);
  const [load,setload] = useState(false);
  const [modal,setmodal] = useState(false);
  const [cat,setcat] = useState("all");
  const [order,setorder] = useState("");
  const [groceries,setgroceries] = useState([]);
  const [clothes,setclothes] = useState([]);
  const [dining,setdining] = useState([]);
  const [travel,settravel] = useState([]);
  const [others,setothers] = useState([]);
  const [stationary,setstationary] = useState([]);
  const [show,setshow] = useState([]);
  const navigate = useNavigate();
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
                if(Number(d1) > Number(d2)){
                    var temp = array[j]
                    array[j] = array[j + 1]
                    array[j+1] = temp
                    flag = true;
                }
            }
            else if(Number(m1) > Number(m2)){
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
        var groctemp = []
        var clothestemp = []
        var diningtemp = []
        var traveltemp = []
        var stationarytemp = []
        var othertemp = []
        // console.log(res);
        let a = 0;
        res["resp"].reverse().forEach(item => {
            const ele = <tr key = {a}>
                <td>{item["name"]}</td>
                <td>{item["amount"]}</td>
                <td>{item["date"]}</td>
                <td>{item["category"]} </td>
                <td>
                    <div>
                        <Button variant="warning" onClick={() => {
                            setmodal(true);
                        }}>Edit</Button>{' '}
                        <Button variant="danger" onClick = {() => {
                            fetch('http://127.0.0.1:8000/user/delete/'+item["id"]);
                            setload(load => !load);
                        }}>Delete</Button>
                    </div>
                </td>
            </tr>
            temp = [...temp,ele];
            if(item["category"] === "groceries") groctemp = [...groctemp,ele]
            else if(item["category"] === "clothes") clothestemp = [...clothestemp,ele]
            else if(item["category"] === "dining") diningtemp = [...diningtemp,ele]
            else if(item["category"] === "travel") traveltemp = [...traveltemp,ele]
            else if(item["category"] === "stationary") stationarytemp = [...stationarytemp,ele]
            else if(item["category"] === "others") othertemp = [...othertemp,ele]
            a++;
        });
        console.log(res["resp"]);
        // bubbleSort(res["resp"]);
        settransactions(temp);
        setclothes(clothestemp);
        setgroceries(groctemp);
        setdining(diningtemp);
        setothers(othertemp);
        setstationary(stationarytemp);
        setshow(temp);
    })
  },[load])
  return (
    <Page>
        {!modal?
        <>
        <Left>
            <div id = "menu">
            <div id = "home">
                <img src = "https://img.icons8.com/fluency/2x/four-squares.png" alt="home"></img>
                <p onClick={() => {navigate('/home')}}>Home</p>
            </div>
            <div id = "trans-hist">
                <img src = "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/2x/external-transaction-history-online-money-service-flaticons-lineal-color-flat-icons-2.png" alt = "trans-hist"></img>
                <p onClick={() => {navigate('/history')}}>Transaction History</p>
            </div>
            <div id = "pend-hist">
                <img src = "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/2x/external-hour-glass-measurement-icongeek26-linear-colour-icongeek26.png" alt = "pend-hist"></img>
                <p onClick = {() => {navigate('/pending')}}>Pending Transaction</p>
            </div>
            </div>
        </Left>
        <Right>
            <div>
            </div>
            <RecentTransaction>
                <div id = "headTrans">Recent Transactions</div>
                <div  id = "filters">
                <div>Category : </div>
                <select id="cati" name="category" onChange={(event) => {
                    console.log(event.target.value);
                    switch(event.target.value){
                        case 'groceries':
                        {
                            setshow(groceries);
                            break;
                        }
                        case 'clothes':
                        {
                            // console.log('clothes => ',clothes);
                            setshow(clothes);
                            break;
                        }
                        case 'dining':
                        {
                            setshow(dining);
                            break;
                        }
                        case 'travel':
                        {
                            setshow(travel);
                            break;
                        }
                        case 'stationary':
                        {
                            setshow(stationary);
                            break;
                        }
                        case 'others':
                        {
                            setshow(others);
                            break;
                        }
                        default:
                        {
                            setshow(transactions);
                            break;
                        }
                    }
                }}>
                    <option value="groceries">Groceries</option>
                    <option value="clothes">Clothes</option>
                    <option value="dining">Dining</option>
                    <option value="travel">Travel</option>
                    <option value="stationary">Stationary</option>
                    <option value="others">Others</option>
                    <option value="all">All</option>
                </select>
                <div>Date:</div>
                <select id = "date-data" onChange = {(event) => {
                    console.log(order);
                    if(event.target.value === "latest"){
                        let s = show;
                        s.reverse();
                        setshow(s);
                        setorder("oldest");
                    }
                    else{
                        let s = show;
                        s.reverse();
                        setshow(s);
                        setorder("latest");
                    }
                }}>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
                </div>
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Transaction Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {show}
            </tbody>
            </table>
            </RecentTransaction>
        </Right>
        </>
        :
        <Card id = "cardele">
                    <Button id = "close-modal" variant = "danger" onClick={() => {
                        setmodal(false);
                    }}>X</Button>
                    <div id = "innerpart">
                    <div id = "transaction">
                        <div>Transaction Name : </div>
                        <input id = "i1"></input>
                    </div>
                    <div id = "amountpaid">
                        <div>Amount : </div>
                        <input id = "i2"></input>
                    </div>
                    <div id = "date">
                        <div>Date : </div>
                        <input id = "i3" type = "date"></input>
                    </div>
                    <div id = "cat">
                    <label for="cat">Category : </label>
                    <select id="cati" name="category">
                    <option value="groceries">Groceries</option>
                    <option value="clothes">Clothes</option>
                    <option value="dinning">Dinnig</option>
                    <option value="Travel">Travel</option>
                    <option value="Stationary">Stationary</option>
                    <option value="others">Others</option>
                    </select>
                    </div>
                    <div id = "type">
                        <label for = "type">Type : </label>
                        <select id = "typei"  name = "type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="transfer">Transfer</option>
                        </select>
                    </div>
                    <button onClick={() => {setmodal(false);}}>Add Transaction</button>
                    </div>
                </Card>
        }
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
    width:18vw;
    #home,#trans-hist,#pend-hist{
        display:flex;
        flex-direction:row;
        font-size:13px;
        align-items:center;
        margin-left:3vw;
        margin-bottom:5px;
        cursor:pointer;
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
`;
const RecentTransaction = styled.div`
    margin-top:8vh;
    width:100%;
    padding-left:8vw;
    padding-right:8vw;
    #columns{
        display:flex;
        flex-direction:row;
        font-size:12px;
        color:grey;
    }
    #headTrans{
        margin-bottom:20px;
        font-size:24px;
        font-weight:bold;
    }
    #transname{
        margin-right:20vw;
        margin-left:20px
    }
    #Amount{
        margin-right:5vw;
    }
    #Date{
        margin-right:5vw;
    }
    #category{
        margin-right:25px;
        margin-left:4vw;
    }
    td{
        text-align:left;
    }
    #filters{
        display:flex;
        flex-direction:row;
    }
    select{
        margin-right:20px;
        margin-left:5px;
        margin-bottom:20px;
    }
`;
const Card = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-right:auto;
    #close-modal{
        width:40px;
        height:40px;
        margin-bottom:4vh;
        background-color:red;
        border-radius:20px;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }
    padding:20px;
    #innerpart{
        padding:2vh;
        background-color:white;
        border:solid 1px black;
        border-radius:10px;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }
    #transaction,#amountpaid,#date,#cat,#type{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        margin-bottom:7px;
        font-weight:bold;
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
    }
`;
export default TransactionHistory