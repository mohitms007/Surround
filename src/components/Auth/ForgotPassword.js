import React,{useState,useContext} from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext)
  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [isResetPassword,setIsResetPassword] =  useState(false)
  const [passwordResetError,setPasswordResetError] = useState(null)

  async function handleResetPassword(){
    try{
      await firebase.resetPassword(resetPasswordEmail)
      setIsResetPassword(true)
    }catch(e){
      setPasswordResetError(e.message)
      console.log("error sending email",e)
      setIsResetPassword(false)
    }
  }

  return (
    <div className="reset-container">
      <input
       type="email"
       className="input"
       placeholder="Provide your account email"
       onChange={(event) => setResetPasswordEmail(event.target.value)}
       />
         <button className="button btn-submit pointer mr2" onClick={handleResetPassword}>
           Reset Password
         </button>
         
         {isResetPassword && <p>Check email to reset password </p>}
        { passwordResetError && <p className="error-text">{passwordResetError}</p>}
       </div>
  )
}

export default ForgotPassword;
