import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FieldStyled } from './FieldStyled.styled';
import { LabelStyled } from './LabelStyled.styled';
import { ErrorMessageStyled } from './ErrorMessageStyled.styled';
import { ButtonSyled } from './ButtonStyled.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
// import { addContact } from 'redux/actions';
// import { nanoid } from '@reduxjs/toolkit';

const Schema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  phone: Yup.string()
    .required('Required')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const initialValues = {
  name: '',
  phone: '',
};

export function ContactForm() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  function submitHandler(values, actions) {
    const { name, phone } = values;
    actions.resetForm({
      values: {
        name: '',
        phone: '',
      },
    });
    if (contacts.some(contact => contact.name.includes(name))) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact({ name, phone }));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={submitHandler}
    >
      <Form>
        <LabelStyled htmlFor="name">Name</LabelStyled>
        <FieldStyled className="Field_mg" id="name" name="name" />
        <ErrorMessageStyled name="name" />
        <LabelStyled htmlFor="phone">Phone</LabelStyled>
        <FieldStyled id="phone" name="phone" />
        <ErrorMessageStyled name="phone" />
        <ButtonSyled type="submit">Add contact</ButtonSyled>
      </Form>
    </Formik>
  );
}
