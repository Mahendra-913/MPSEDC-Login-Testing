import { useEffect, useState } from "react";

function Welcome() {

  const [showWelcome, setShowWelcome] = useState(false);
  const [showMPSEDC, setShowMPSEDC] = useState(false);

  useEffect(() => {

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    const mpsedcTimer = setTimeout(() => {
      setShowMPSEDC(true);
    }, 2500);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(mpsedcTimer);
    };

  }, []);

  return (

    <main className="welcome-page">

      {/* Animated background */}

      <div className="welcome-orb orb-one"></div>
      <div className="welcome-orb orb-two"></div>
      <div className="welcome-orb orb-three"></div>


      <div className="welcome-content">

        {showWelcome && (
          <h1 className="welcome-text">
            Welcome
          </h1>
        )}

        {showMPSEDC && (
          <h2 className="mpsedc-text">
            MPSEDC
          </h2>
        )}

      </div>

    </main>

  );
}

export default Welcome;