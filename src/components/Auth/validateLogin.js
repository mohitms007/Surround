export default function validateLogin(values) {

    let errors = {}

    //  Email Related Errors
    if( !values.email){
        errors.email = "Email Required"
    }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Invalid Email Address"
    }

    // Password Related Erros
    if(!values.password){
        errors.password = "Password Required"
    }else if ( values.password.length < 6){
        errors.password = "Password must be 6 characters."
    }
    return errors
}
