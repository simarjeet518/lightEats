module.exports =(result)=>{
  console.log(result.length);
  let ordersArray = [];
  let a= result[0].id;
  let newObj={}
  let orderAlreadyinResult ="new"
  for(let i=0; i<result.length;i++)
   {
    console.log(i);
     if(a === result[i].id){

       if(orderAlreadyinResult==="new"){
        newObj.id = result[i].id;
        newObj.created_at= result[i].created_at.toString().substring(0,24);
        newObj.customer_name = result[i].customer_name;
        newObj.order_total= (result[i].order_total/100).toFixed(2);
        newObj.quantity = 0;
        orderAlreadyinResult="old";
        newObj.items =[];
       }

        let b ={
          item_name:result[i].name,
          quantity :result[i].quantity,
          price:(result[i].price/100).toFixed(2)
        }
        newObj.items.push(b);

        newObj.quantity += result[i].quantity;


     }
     else {

      ordersArray.push(newObj)
       newObj ={};
       a= result[i].id;
       orderAlreadyinResult="new";
       i--;
     }
     if(i ===result.length-1){
       ordersArray.push(newObj);
     }
   }
   return ordersArray;
 }


