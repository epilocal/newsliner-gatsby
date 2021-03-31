import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Loader from "../../images/loader";

const SubscribeForm = ({ children, buttonText, successMessage, errorMessage, customStyles }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  //let formTypeQuery = '';
  //if (formType) {formTypeQuery = `&form_type=${formType}` };

  const onSubmit = (values, form) => {
    setShowLoading(true);
    /*
    // For Testing
    setTimeout(function() {
      setShowLoading(false);
      setShowErrorMessage(true);
    }, 3000)
    */
    sendData(values, form);
  }

  const sendData = ( values, form ) => {
    async function postData(url) {
       const response = await fetch(url, {
         method: 'POST',
         mode: 'cors',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({email: values.email})
       });
       return response.json();
     }
     postData(`https://wonderful-shaw-a1a7e7.netlify.app/api/subscribe/`)
       .then(data => {
         console.log(data);
         setTimeout(form.reset);
         setShowLoading(false);
         if (data.statusCode  >= 200 && data.statusCode < 400) { setShowSuccessMessage(true) }
         else { setShowErrorMessage(true) }
       })
       .catch((error) => {
         setTimeout(form.reset);
         setShowLoading(false);
         setShowErrorMessage(true)
        });
    }


  return (

    <div className="subscribe-form" style={customStyles}>
      <div className="subscribe-form">
        <Form
          onSubmit={ onSubmit }
          initialValues={{}}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="youremail@example.com"
                  autoComplete="false"
                  className="subscribe-email"
                />
                <button className="button primary" type="submit" disabled={submitting || pristine}>
                  {showLoading ? <span className="button-loader"><Loader/></span> : <span className="button-content">{buttonText}</span>}
                </button>
              </div>
              <div style={{margin: '0.5rem'}}>
                <label htmlFor="hp-check" style={{display: 'none'}}>
                  <Field
                    name="hp-check"
                    component="input"
                    type="checkbox"
                    validate={value => (value ? "Don't Check" : undefined )}
                    value="checked"
                  />
                </label>
              {showSuccessMessage ?
                <div className="message-success">
                  {successMessage}
                </div> : null }
              {showErrorMessage ?
                <div className="message-error">
                    {errorMessage}
                </div> : null }
              </div>
              </form>
            )}
            />

        </div>
      </div>

    )
}

SubscribeForm.defaultProps = {
  successMessage: 'Thanks! Your email address has been successfully added - look out for an email from us',
  errorMessage: 'Sorry, something went wrong on our side - please try again later or send a message on our Contact Us page',
  buttonText: 'Subscribe'
};

export default SubscribeForm;
