import React, {useState, useEffect} from "react";
import useFormValidation from './useFormValidation'
import validateLogin from "./validateLogin";
import firebase from '../../firebase'

const INITIAL_STATE = {
    name: "",
    email: "",
    password: ""
}

function Login(props) {

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        isSubmitting
    } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)

    const [login,
        setLogin] = useState(true)
    const [firebaseError, setFirebaseError] = useState(null)
    async function authenticateUser(){
        const {name, email, password} = values
        try{
            const response = login ? 
            await  firebase.login(email,password)
             : await firebase.register(name,email,password)
            props.history.push("/")
        }catch(e){
            console.error('Authentication Error',e)
            setFirebaseError(e.message)
        }
       
    }

    return (
        <div className="login-form">
            <h2 className="mv3 tc items-center">{login
                    ? "Login"
                    : "Create Account"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-column items-center">
                {!login && <input
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="off"/>}
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && 'error-input'}
                    value={values.email}
                    placeholder="Your Email"
                    autoComplete="off"/> {errors.email && <p className="error-text">{errors.email}</p>}
                   
                <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={errors.password && "error-input"}
                    name="password"
                    type="password"
                    placeholder="Your Password"/> {errors.password && <p className="error-text">{errors.password}</p>}
                      {firebaseError  && <p className="error-text">{firebaseError}</p>}
                <div className="flex inline mt3 btn-container">
                    <button
                        type="submit"
                        className="button btn-submit pointer mr2"
                        disabled={isSubmitting}
                        style={{
                        background: isSubmitting
                            ? "grey"
                            : "#5cb85c"
                    }}>
                        Submit
                    </button>
                    <button
                        type="button"
                        className="pointer button-2 button mr2"
                        onClick={() => setLogin((prevState) => !prevState)}>{login
                            ? "Sign Up"
                            : "Already have an account?"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;
