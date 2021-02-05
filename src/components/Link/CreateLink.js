import React from "react";
import useFormValidation from '../Auth/useFormValidation'
import validateCreateLink from '../Auth/validateCreateLink'

const INITIAL_STATE = {
  description: "",
  url: ""
}

function CreateLink(props) {

  const {handleSubmit, handleChange, values, errors} = useFormValidation(INITIAL_STATE,validateCreateLink, handleCreateLink)

  function handleCreateLink(){
    console.log("link create")
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        name="description"
        onChange={handleChange}
        value={values.description}
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        className={error.description && 'error-input' }
        />
         <input
        name="url"
        onChange={handleChange}
        value={values.url}
        placeholder="The URL for the link"
        autoComplete="off"
        type="text"
        className={error.url && 'error-input'}
        />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  )
}

export default CreateLink;
