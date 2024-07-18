import { createClient } from "@/utils/supabase/client";

let supabase=createClient()


class OrderController {

    async fetchOrders(){
        try{
            const {data,error}=await supabase.from("orders").select("*")
            if(error){
                return "Error fetching orders: ",e
            }
            else{
                console.log(data)
                return data
                
            }
        }catch(e){
            return "Error: ",e
        }
    }

    async fetchSingleOrder(orderID){
        try{
            const {data,error}=await supabase.from('orders').select('*').eq('id',id).single();
            if(error){
                return 'Error fetching order details : ',e
            }
            else{
                return data
            }
        }catch(e){
            return 'Error: ',e
        }
    }

    async fetchPendingOrdersCount(){
        let count=0;
        try{
            const{data,error}=(await supabase.from('product_orders').select('*').eq('status','pending'))
            if(error){
                return 'Error fetching order details'
            }
            else{
                console.log(data);
                
                for(var item in data){
                    count++
                }
                return count
            }
        }catch(e){
            return 'Error: ',e
        }
    }


}
export default OrderController