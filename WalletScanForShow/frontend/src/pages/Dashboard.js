import DashboardForm from "./components/DashboarForm";
import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { MainLayout } from "./components/utils/Layout";
import Orb from "./components/utils/Orb";
import Budget from "./components/Budget";
import { useTransactionsContext } from "./components/TransactionContext";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { ProfileProvider } from "./components/ProfileContext";
import CategoryForm from "./components/CategoryForm";
import AddTransaction from "./components/AddTransaction";
import History from "./components/History";
import { TransactionProvider } from "./components/TransactionContext";

function Dashboard() {
  const [active, setActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userObject = JSON.parse(localStorage.getItem("user"));
    setUser(userObject);
    const handleStorageChange = () => {
      const updatedUserObject = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUserObject);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const global = useTransactionsContext();
  console.log(global);

  const displayData = () => {
    if (showForm) {
      return <AddTransaction />;
    } else {
      if (active === 1) {
        return <DashboardForm />;
      } else if (active === 2) {
        return <History />;
      } else if (active === 3) {
        return <CategoryForm />;
      } else if (active === 4) {
        return <Budget />;
      } else if (active === 5) {
        return <Profile />;
      } else if (active === 6) {
        return <Settings />;
      } else {
        return <DashboardForm />;
      }
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const handleSetActive = (newActive) => {
    if (newActive === active) {
    } else {
      setShowForm(false);
      setActive(newActive);
    }
  };

  return (
    <TransactionProvider>
      <DashboardStyled className="Dashboard">
        {orbMemo}
        <MainLayout>
          <LeftPanel active={active} setActive={handleSetActive} />
          <ProfileProvider>
            <main>
              <div className="scroll-container">{displayData()}</div>
            </main>
            <RightPanel
              active={active}
              setActive={handleSetActive}
              setShowForm={setShowForm}
            />
          </ProfileProvider>
        </MainLayout>
      </DashboardStyled>
    </TransactionProvider>
  );
}

const DashboardStyled = styled.div`
  height: 820px;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    padding: 10px;
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #9fedb2;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
      border-radius: 10px;
    }
  }
`;

export default Dashboard;
