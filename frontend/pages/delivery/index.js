import React from "react";
import DeliverySidebar from "@/components/delivery_components/deliverySidebar";
import AuthDelivery from "@/components/HOC/AuthDelivery";

const Index = () => {
  return (
    <DeliverySidebar>
      <h2>Hello deliveryman</h2>
    </DeliverySidebar>
  );
};

export default AuthDelivery(Index);
