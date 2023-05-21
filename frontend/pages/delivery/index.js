import React from "react";
import DeliverySidebar from "@/components/delivery_components/deliverySidebar";
import AuthDelivery from "@/components/HOC/AuthDelivery";
import WebSock from "@/components/webSocket";

const Index = () => {
  let user = "DELIVERY";
  return (
    <DeliverySidebar>
      <WebSock username={user} />
    </DeliverySidebar>
  );
};

export default AuthDelivery(Index);
