import React from "react";
import DeliverySidebar from "@/components/delivery_components/deliverySidebar";
import AuthDelivery from "@/components/HOC/AuthDelivery";
import WebSock from "@/components/webSocket";

const Index = () => {
  return (
    <DeliverySidebar>
      <WebSock role={2} />
    </DeliverySidebar>
  );
};

export default AuthDelivery(Index);
