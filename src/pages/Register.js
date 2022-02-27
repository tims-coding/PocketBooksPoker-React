import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import stripePayment from "../api/stripe/stripe_api";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import attemptRegister from "../api/register/register_api";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  let button;
  toast.configure();

  const successMessage = () => {
    toast.success("Payment Successful!");
  };

  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("Pay");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  if (loading) {
    button = (
      <button>
        <ThreeDots color="#fff" height={11} />
      </button>
    );
  } else {
    button = (
      <button disabled={!validName || !validPwd || !validMatch ? true : false}>
        {payment}
      </button>
    );
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await attemptRegister({
        username: user,
        password: pwd,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      //clear state and controlled inputs
      //need value attrib on inputs for this
      if (!error) {
        console.log("Stripe 23 | token generated!", paymentMethod);
        try {
          const { id } = paymentMethod;
          const response = await stripePayment({ id: id });

          console.log("Stripe 35 | data", response);
          if (response.data.success) {
            console.log("CheckoutForm.js 25 | payment successful!");
            successMessage();
            setLoading(false);
            setPayment("Successful!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error);
          toast.error(error);
          setLoading(false);
        }
      } else {
        console.log(error.message);
        toast.error(error.message);
        setLoading(false);
      }
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        setLoading(false);
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        setLoading(false);
      } else {
        setErrMsg("Registration Failed");
        setLoading(false);
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="Register">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <div className="personal-info registration-info">
          <div className="number">1</div>
          <h5>Registration</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <FaCheck className={validName ? "valid" : "hide"} />
            <FaTimes className={validName || !user ? "hide" : "invalid"} />
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FaInfoCircle />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
            Password
            <FaCheck className={validPwd ? "valid" : "hide"} />
            <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password
            <FaCheck className={validMatch && matchPwd ? "valid" : "hide"} />
            <FaTimes className={validMatch || !matchPwd ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FaInfoCircle />
            Must match the first password input field.
          </p>
          <div className="personal-info payment-info">
            <div className="number">2</div>
            <h5>Payment Details</h5>
          </div>
          <div className="register-card-field">
            <CardElement />
          </div>
          <div className="total-field">
            <p>Total</p>
            <h4>$100</h4>
          </div>
          {button}
        </form>
        <p>
          Already registered?
          <br />
          <span className="line">
            <Link to="/">
              <a href="#">Sign In</a>
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
