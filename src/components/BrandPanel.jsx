import {
  ShieldCheck,
  Zap,
  Activity
} from "lucide-react";

function BrandPanel() {
  return (
    <section className="brand-panel">

      {/* Logo */}
      <div className="brand-logo">

        <div className="logo-icon">
          <ShieldCheck size={26} />
        </div>

        <div>
          <h2>SecureFlow</h2>
          <span>Enterprise Portal</span>
        </div>

      </div>


      {/* Main Content */}
      <div className="brand-content">

        <div className="eyebrow">
          <span className="live-dot"></span>
          SECURE ACCESS
        </div>

        <h1>
          Welcome back.
          <br />

          <span>
            Your workspace awaits.
          </span>
        </h1>

        <p>
          Sign in to access your workspace, manage
          your account and continue where you left off.
        </p>


        {/* Features */}
        <div className="security-features">

          <div className="security-item">

            <div className="feature-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <strong>Enterprise Security</strong>

              <span>
                Your credentials are securely protected.
              </span>
            </div>

          </div>


          <div className="security-item">

            <div className="feature-icon">
              <Zap size={19} />
            </div>

            <div>
              <strong>Fast & Reliable</strong>

              <span>
                Instant access to your workspace.
              </span>
            </div>

          </div>


          <div className="security-item">

            <div className="feature-icon">
              <Activity size={19} />
            </div>

            <div>
              <strong>System Status</strong>

              <span className="status-text">
                All systems operational
              </span>
            </div>

          </div>

        </div>

      </div>


      {/* Footer */}
      <div className="brand-footer">

        <span>© 2026 SecureFlow</span>

        <span>Privacy</span>

        <span>Terms</span>

      </div>

    </section>
  );
}

export default BrandPanel;