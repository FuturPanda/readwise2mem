import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseConfig";
import { useAuth } from "./contexts/Auth";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";

const Dashboard = () => {
  const [lastFetched, setLastFetched] = useState("");
  const { user: userToSet, signOut, session } = useAuth();
  const [user, setUser] = useState(userToSet);
  const [activeModal, setActiveModal] = useState(false);
  const [classAnimated, setClassAnimated] = useState("profile-box");

  const showModal = () => {
    if (activeModal == true) {
      setActiveModal(false);
      return closeModal();
    }
    activeModal == false ? setActiveModal(true) : setActiveModal(false);
    const timer = setTimeout(() => {
      setClassAnimated("profile-box animated");
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };
  const closeModal = (e) => {
    console.log(e.target);
    if (e.target == e.currentTarget) {
      console.log(e.target);
      activeModal == false ? setActiveModal(true) : setActiveModal(false);
      setClassAnimated("profile-box");
    }
  };

  useEffect(() => {}, [classAnimated]);

  return (
    <div className="myprofile dashboard-box">
      <div className="wrapper">
        <Backdrop visible={activeModal} onClick={closeModal}>
          <Modal
            user={user}
            signOut={signOut}
            activeModal={activeModal}
            classAnimated={classAnimated}
            session={session}
          />
        </Backdrop>
      </div>
      <nav className="topbar">
        <h2>Readwise to Mem</h2>
        <div className={activeModal == true ? "modal active" : "modal"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
            onClick={showModal}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
