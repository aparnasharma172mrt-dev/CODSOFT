let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function addTransaction(){


    let title=document.getElementById("title").value;
    let amount=document.getElementById("amount").value;
    let type=document.getElementById("type").value;
    let category=document.getElementById("category").value;
    let date=document.getElementById("date").value;


    let transaction={
        id:Date.now(),
        title,
        amount:Number(amount),
        type,
        category,
        date
    };

    transactions.push(transaction);
    saveData();
    displayTransaction();


    document.getElementById("title").value="";
    document.getElementById("amount").value="";
    document.getElementById("date").value="";

}


function saveData(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function displayTransaction(){
    let list=document.getElementById("transactionList");
    list.innerHTML="";
    let income=0;
    let expense=0;

    transactions.forEach((item)=>{

        if(item.type=="income"){
            income+=item.amount;
        }
        else{
            expense+=item.amount;
        }


        let li=document.createElement("li");
        li.innerHTML=`
        <b>${item.title}</b>
        <br>

        Amount: ₹${item.amount}
        <br>
        Category:${item.category} 
        <br>
        Date:${item.date}
        <br>

        <button onclick="deleteTransaction(${item.id})">
        Delete</button>
        `;

        list.appendChild(li);
        
    });


    document.getElementById("income").innerText="₹"+income;
    document.getElementById("expense").innerText="₹"+expense;
    document.getElementById("balance").innerText="₹"+(income-expense);

}


function deleteTransaction(id){
    transactions=transactions.filter(
        (item)=>item.id!=id
    );

    saveData();
    displayTransaction();
}


function filterTransaction(){
    let value=document.getElementById("filter").value;
    let list=document.getElementById("transactionList");
    list.innerHTML="";

    transactions.filter(item=>{

        if(value=="All")
            return true;

        return item.category==value;
    })

    .forEach(item=>{
         let li=document.createElement("li");


         li.innerHTML=`
         <b>${item.title}</b><br>
         ₹${item.amount}<br>
         ${item.category}<br>
         ${item.date}
         `;


         list.appendChild(li)
            

       
    });
}
displayTransaction();


