import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

interface FormikTextFieldProps
  extends FieldProps,
    Omit<TextFieldProps, 'name' | 'value' | 'error'> {}

const mapToTextField = (props: FormikTextFieldProps): TextFieldProps => {
  const {
    disabled,
    field: { onBlur: fieldOnBlur, ...field },
    form: { isSubmitting, touched, errors },
    onBlur,
    helperText,
    variant,
    ...rest
  } = props;

  const fieldErrorMessage = getIn(errors, field.name) as string;
  const showError: boolean =
    !!(getIn(touched, field.name) as string) && !!fieldErrorMessage;

  return {
    // Using spread operator make variant's type change.
    variant,
    disabled: disabled ?? isSubmitting,
    error: showError,
    helperText: showError ? fieldErrorMessage : helperText,
    onBlur:
      onBlur ??
      function (e: any) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...rest,
  };
};

const FormikTextField: React.FC<FormikTextFieldProps> = (props) => {
  return <TextField {...mapToTextField(props)} />;
};

export default FormikTextField;
