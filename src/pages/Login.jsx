import BrandPanel from "../components/BrandPanel";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <main className="login-page">

      {/* Background */}
      <div className="background-effects">

        <div className="gradient-orb orb-one"></div>

        <div className="gradient-orb orb-two"></div>

        <div className="gradient-orb orb-three"></div>

      </div>


      {/* Main Container */}
      <div className="login-container">

        <BrandPanel />

        <section className="login-section">

          <LoginForm />

        </section>

      </div>

    </main>
  );
}

export default Login;