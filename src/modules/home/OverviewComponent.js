import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
display:flex;
flex-direction: column;
font-family: Montserrat;
align-items: center;
margin: 10px;
width: 100%;
`;
const BalanceBox = styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
font-size: 18px;
width: 100%;
font-weight: bold;
`;

const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 6px;
  font-weight: bold;
  align-items: center;
`;

const AddTransactionContainer = styled.div`
display: flex;
flex-direction: column;
border: 1px solid #e6e8e9;
gap: 10px;
width: 100%;
padding: 15px 20px;
margin: 20px;
align-items: center;
& input{
     width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
}
`;
const RadioBox = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
& input{
    width: unset;
    margin: 0 10px;
}
`;
const AddTransactionView = (props) => {
    const [amount , setAmount] = useState();
    const [desc , setDesc] = useState();
    const [type , setType] = useState("Expense");
    const [date , setDate] = useState();

    const addTransaction = () => {
        props.addTransaction({amount:Number(amount) , desc , type , date});
        props.toggleAdd();
    };

    return(
        <AddTransactionContainer>
            <input placeholder="Amount" 
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            />
            <input placeholder="Description" 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}/>
            <input type="date" id="todayDate" value={date} onChange={(e) => setDate(e.target.value)}></input>
            <RadioBox>
                <input type="radio" name="type" id="expense" value="Expense" checked={type==="Expense"} onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="expense">Expense</label>
                <input type="radio" name="type" id="income" value="Income" checked={type==="Income"} onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="income">Income</label>
            </RadioBox>
            <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
        </AddTransactionContainer>
    );
};
const NextContainer = styled.div`
display: flex;
flex-direction: row;
gap: 12px;
margin: 20px;
`;
const Box = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
    padding: 15px 20px;
    width: 135px;
    font-size: 14px;
    & span{
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => (props.isIncome ? "green" : "red")};
    }
`;
const OverviewComponent = (props) => {
    const [isAddVisible , toggleAdd] = useState(false);
    return(
        <Container>
            <BalanceBox>
                Balance: &#8377;{props.income - props.expense}
                <AddTransaction onClick={() => toggleAdd(!isAddVisible)}>{isAddVisible ? "Cancel" : "ADD"}</AddTransaction>
            </BalanceBox>
            {isAddVisible && (<AddTransactionView toggleAdd={toggleAdd} addTransaction={props.addTransaction} />)}
            <NextContainer>
                <Box isIncome={false}>
                    Expense<span>&#8377;{props.expense}</span>
                </Box>
                <Box isIncome={true}>
                    Income<span>&#8377;{props.income}</span>
                </Box>
            </NextContainer>
        </Container>
    )
}
export default OverviewComponent