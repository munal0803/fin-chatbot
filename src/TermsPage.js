import React from "react";
import "./TermsPage.css";

export default function TermsPage({ onBack }) {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>

        <p>
          Welcome to Fin-Bridge. These terms and conditions outline the rules and
          regulations for the use of our platform.
        </p>

        <h3>1. Data Usage</h3>
        <p>
          By signing up, you agree that your personal data including name, age group,
          email, and financial preferences will be collected to personalize your
          experience. We do not sell your data to third parties.
        </p>

        <h3>2. Security</h3>
        <p>
          We implement secure protocols to store your data and prevent unauthorized
          access. However, we cannot guarantee 100% security due to the nature of the
          internet.
        </p>

        <h3>3. User Responsibility</h3>
        <p>
          You are responsible for maintaining the confidentiality of your login
          credentials. Do not share your password or personal details with anyone.
        </p>

        <h3>4. Accuracy of Information</h3>
        <p>
          Users must provide accurate, complete, and up-to-date information. Providing
          false data may lead to account suspension.
        </p>

        {/* <h3>5. Service Modification</h3>
        <p>
          We may update or discontinue services at any time without prior notice. Your
          continued use of the platform indicates acceptance of such changes.
        </p> */}

        <h3>5. Contact</h3>
        <p>
          If you have any questions about these Terms, contact us at
          <a href="mailto:support@finchatbot.com"> support@finbridgebot.com</a>.
        </p>

        <button className="back-button" onClick={onBack}>
          ← Back to Signup
        </button>
      </div>
    </div>
  );
}