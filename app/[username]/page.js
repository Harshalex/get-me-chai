import React from "react";
import PaymentPage from "../components/PaymentPage";

async function page({ params }) {
  const { username } = await params;
  return (
    <PaymentPage username={username}/>
  );
}

export default page;