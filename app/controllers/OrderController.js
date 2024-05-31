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


}
export default OrderController