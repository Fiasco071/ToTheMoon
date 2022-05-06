import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignUpForm from "./components/SignUpFormModal/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import TransactionForm from "./components/Transaction";
import Footer from "./components/About";
import UserTransactionHistory from "./components/UserTransactions";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <LandingPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/stocks/:id" exact={true}>
          <StockDetail />
        </ProtectedRoute>
        <ProtectedRoute path="/my-transactions" exact={true}>
          <UserTransactionHistory />
        </ProtectedRoute>
      </Switch>
      {<Footer />}
    </BrowserRouter>
  );
}

export default App;
