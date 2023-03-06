import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/Auth";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";
import ImportRM from "./components/importRM";

const Dashboard = () => {
  const { user: userToSet, signOut, sessionState, getUser } = useAuth();
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

  useEffect(() => {
    setUser(userToSet);
  }, []);

  return (
    <div className="myprofile dashboard-box">
      <div className="wrapper">
        <Backdrop visible={activeModal} onClick={closeModal}>
          <Modal
            user={userToSet}
            signOut={signOut}
            activeModal={activeModal}
            classAnimated={classAnimated}
            session={sessionState}
            key={user.id}
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
      <section>
        <h3>Welcome ! </h3>
        <p>
          To start import your readwise highlights to Mem, you first need to
          fill in your Readwise Api Key and Mem Api Key in your user profile.
          Then you can test to see if everything is working fine with the Test
          button, which will import your highlights from the past two days. If
          everything is working fine, you can go ahead and click the import all
          button. For now R2M doesn't support continuous import, so you'll need
          to come here to import manually when you need your hilights. Don't
          worry, there will be not duplicates, new highlights from existing
          imports will be append to their respectives mems.
        </p>{" "}
        <br />
        <p>
          For any troubleshooting, don't hesitate to email me at :
          sty.hoareau@gmail.com. You cant find me on twitter or github. For the
          record, I am actually learning web development, so I would really
          apreciate if you could star this project on github, it would greatly
          help me to find a job ! Thank you very much, Have a great day.
        </p>
      </section>
      <ImportRM
        memApiKey={user.memApiKey}
        readwiseApiKey={user.readwiseApiKey}
        lastFetched={user.lastFetched}
        userId={sessionState.user.id}
        importStatus={user.importStatus}
      />
    </div>
  );
};

export default Dashboard;
