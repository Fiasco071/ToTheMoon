import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const TransactionForm = () => {
  const [isBuy, setIsBuy] = useState(true);

  return <>{isBuy && <form></form>}</>;
};
