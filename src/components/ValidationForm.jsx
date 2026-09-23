function SignupForm() {
  const { values,errors,touched,isSubmitting,isValid,handleChange,handleBlur,handleSubmit,setFieldValue,resetForm
  } = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      preferences: {
        newsletter: true,
        notifications: false
      }
    },
    
    validate: (values) => {
      const errors = {};
      
      if (!values.email) errors.email = 'Required';
      else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email';
      }
      
      if (!values.password) errors.password = 'Required';
      else if (values.password.length < 8) {
        errors.password = 'Must be 8+ characters';
      }
      
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
      
      return errors;
    },
    
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await api.signup(values);
        // Success handling
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    }
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && (
        <div className="error">{errors.email}</div>
      )}
      
      {/* ... other fields */}
      
      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
      
      {errors.submit && <div className="error">{errors.submit}</div>}
    </form>
  );
}