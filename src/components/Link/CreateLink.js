import React,{useContext} from "react";
import useFormValidation from '../Auth/useFormValidation'
import validateCreateLink from '../Auth/validateCreateLink'
import FirebaseContext from '../../firebase/context'

const INITIAL_STATE = {
    description: "",
    url: ""
}

function CreateLink(props) {
    const { firebase, user } = useContext(FirebaseContext)
    const {handleSubmit, handleChange, values, errors} = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink)

    function handleCreateLink() {
       if(!user){
         props.history.push('/login')
       }else{
         const {url,description,title} = values
       const newLink = {
         url,
         title,
         description,
         postedBy: {
           id: user.uid,
           name: user.displayName

         },
         votes: [],
         comments: [],
         created: Date.now()
       }
       firebase.db.collection('links').add(newLink)
       props.history.push("/")
      }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center flex-column mt6">
          <h1 className="new_story-title"> Add your Story</h1>
            <input
                name="title"
                onChange={handleChange}
                value={values.title}
                placeholder="Title for your Story"
                autoComplete="off"
                type="text"
                className={errors.title && 'error-input'}/> {errors.title && <p className="error-text">{errors.title}</p>}
             <input
                name="description"
                onChange={handleChange}
                value={values.description}
                placeholder="Description for your Story"
                autoComplete="off"
                type="text"
                className={errors.description && 'error-input'}/> {errors.description && <p className="error-text">{errors.description}</p>}
            <input
                name="url"
                onChange={handleChange}
                value={values.url}
                placeholder="The URL for the link"
                autoComplete="off"
                type="url"
                className={errors.url && 'error-input'}/> 
            {errors.url && <p className="error-text">{errors.url}</p>}
            <button className="button btn-submit " type="submit">
                Submit
            </button>
        </form>
    )
}

export default CreateLink;
