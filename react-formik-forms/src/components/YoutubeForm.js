import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "Edwin",
  email: "e@g.com",
  channel: "react",
  comments: "react comments",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  // console.log("onSubmitProps", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
    >
      {(formik) => {
        // console.log("formik", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="Youtube channel name"
              />
              <ErrorMessage name="channel" />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField id="address" name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input id="address" type="text" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>
            <div className="form-control">
              <label>List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, i) => (
                        <div key={i}>
                          <Field name={`phNumbers[${i}]`} />
                          {i > 0 && (
                            <button type="button" onClick={() => remove(i)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit fields
            </button> */}

            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Save Data
            </button>
            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
