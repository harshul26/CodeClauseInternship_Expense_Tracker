import styled from "styled-components";
import { useEffect, useState } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";

const Container = styled.div`
display:flex;
flex-direction: column;
font-family: Montserrat;
align-items: center;
padding : 25px;
margin: 30px 0 10px;
width: 360px;
`;


const HomeComponent = (props) => {
    const [transactions , updateTransaction] = useState([]);
    const [expense , updateExpense] = useState(0);
    const [income , updateIncome] = useState(0);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
    };

    const calculateBox = () => {
    let exp = 0;
    let inc = 0;
        transactions.map((payload) => {
             payload.type === "Expense" ? (exp += payload.amount) : (inc += payload.amount);
        });
        updateExpense(exp);
        updateIncome(inc);
    };

    useEffect(() => calculateBox() , [transactions]);

    return(
        <Container>
            <OverviewComponent addTransaction={addTransaction} expense = {expense} income = {income}/>
            <TransactionComponent transactions={transactions}/>
        </Container>
    )
}
export default HomeComponent