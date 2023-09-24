import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
display:flex;
flex-direction: column;
font-family: Montserrat;
align-items: flex;
font-size: 18px;
width: 100%;
gap: 10px;
padding: 10px 22px;
& input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 100%;
}
`;
const Header = styled.span`
color:black;
font-size: 25px;
font-weight : bold;
`;

const Cell = styled.div`
display:flex;
flex-direction: row;
width: 100%;
padding: 10px 15px;
font-size: 14px;
border: 1px solid #e6e8e9;
border-radius: 10px;
align-items: center;
font-weight: normal;
justify-content: space-between;
border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
border-left: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const TransactionCell = (props) => {
    
    return (
        <Cell isExpense={props.payload?.type === "Expense"}>
            <span>{props.payload.date}</span>
            <span>{props.payload.desc}</span>
            <span>&#8377;{props.payload.amount}</span>

        </Cell>
    )
};

const TransactionComponent = (props) => {
    const [searchText , updateSearchtext] = useState("");
    const [filteredTransaction , updateTxn] = useState(props.transactions);
    const filterData = (searchText) => {
        if(!searchText || !searchText.trim().length){
            updateTxn(props.transactions);
            return;
        }
        let txn = [...props.transactions];
        txn = txn.filter((payload) => 
        payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
        );
        updateTxn(txn);
    };

    useEffect(() => filterData(searchText) , [props.transactions]);
    return(
        <Container>
            <Header>Transaction</Header>
            <input placeholder="Search" value={searchText} onChange={(e) => {updateSearchtext(e.target.value); filterData(e.target.value);}}></input>
            {filteredTransaction?.length ? filteredTransaction.map((payload)=> (<TransactionCell payload = {payload}/>)) : ""}
        </Container>

    )
}
export default TransactionComponent