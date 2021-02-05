export default function validateCreateLink(values) {


    let errors = {}

    //  Description Errors
    if( !values.description){
        errors.description = "Description Required"
    }else if(values.description.length < 10){
        errors.description = "Description must be at least 10 characters."
    }

    // Password Related Erros
    if(!values.url){
        errors.url = "Url is required"
    }else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ){
        errors.url = "Url must be valid"
    }
    return errors

}
