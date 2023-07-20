import { useEffect, useState } from "react";
import "./App.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "./firebase";

function App() {
  const auth = getAuth(app);
  auth.useDeviceLanguage();
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber.toString(), appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP sent successfully");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        window.recaptchaVerifier.render().then(function (widgetId) {
          /* global grecaptcha*/
          grecaptcha.reset(widgetId);
        });
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    /*global confirmationResult*/
    confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        alert("OTP verified");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        console.log(response);
        handleSubmit();
      },
    });
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button type="submit" id="sign-in-button">
          Send Otp
        </button>
      </form>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
        <button type="submit" id="otp-submit-button">
          verify Otp
        </button>
      </form>
    </>
  );
}

export default App;
