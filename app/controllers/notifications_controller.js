import { createClient } from "@/utils/supabase/client";

let supabase = createClient();

class NotificationsController {
  fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from("order_notifications")
        .select("*products!inner(item_name)");
      return data.length;
    } catch (e) {
      rethrow;
    }
  };
}
