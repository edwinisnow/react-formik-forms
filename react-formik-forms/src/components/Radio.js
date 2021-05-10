import { Field, ErrorMessage } from "formik";
import React from "react";
import TextError from "./TextError";

function Radio(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          // id, name, value
          console.log("field", field);
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <div className="radiobutton">
                  <input
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </div>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
export default Radio;
