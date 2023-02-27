import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseConfig";
import { useAuth } from "./contexts/Auth";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";

const Dashboard = () => {
  const [lastFetched, setLastFetched] = useState("");
  const { user: userToSet, signOut } = useAuth();
  const [user, setUser] = useState(userToSet);
  const [activeModal, setActiveModal] = useState(false);

  const showModal = () => {
    activeModal == false ? setActiveModal(true) : setActiveModal(false);
  };
  const closeModal = () => {
    activeModal == false ? setActiveModal(true) : setActiveModal(false);
  };

  return (
    <div className="myprofile dashboard-box">
      <nav>
        <p>Hey</p>
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
      </nav>
      <Modal
        user={user}
        signOut={signOut}
        activeModal={activeModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Dashboard;
