"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
let supabase = createClient();
export const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const markAsRead = async (notification_id) => {
    try {
      const { data, error } = await supabase
        .from("order_notifications")
        .update({
          read: "TRUE",
        })
        .eq("id", notification_id);
    } catch (e) {
    } finally {
    }
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("order_notifications")
          .select("*,products!inner(item_name)")
          .eq("read", "FALSE");
        setNotifications(data);

        console.log(data.length);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="p-4 border-b flex flex-row items-center gap-4"
        >
          <div>
            <h3 className="text-sm font-semibold">New Order</h3>
            <p className="text-md text-gray-600">
              {notification.products.item_name}
            </p>
            <p className="text-xs text-gray-600">
              Date: {new Date(notification.order_date).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-600">
              Total Orders: {notification.total_orders}
            </p>
          </div>
          <div>
            <Button
              variant="light"
              color="primary"
              onClick={() => markAsRead(notification.id)}
            >
              Mark as read
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
