const validate = (values) => {
    const errors = {};

    if (!values.location) {
        errors.location = 'Required';
    }
    return errors;
};
export default validate;