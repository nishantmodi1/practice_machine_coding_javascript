import { useState } from "react";

const useForm = ({iniitalVlaues, validate, onSubmit}) => {
  const [values, setValues] = useState(iniitalVlaues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues(prev => ({ ...prev, [name]: value}));
    if (touched[name]) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      setIsSubmitting(Object.keys(validationErrors).length === 0); 
    }



  }
  return {
    values: iniitalVlaues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    handleChange,
    handleBlur: () => {},
    handleSubmit: (e) => {
      e.preventDefault();
      onSubmit(values, { setSubmitting: () => {}, setErrors: () => {} });
    },
    setFieldValue: () => {},
    resetForm: () => {}
  }
}