import {z} from 'zod';

export enum FieldType {
  REGULAR = 'regular',
  DATE = 'date',
  PHONE = 'phoneInput',
}

const fields = {
  email: {
    type: FieldType.REGULAR,
    name: 'email',
    placeholder: 'Email',
  },
  password: {
    type: FieldType.REGULAR,
    name: 'password',
    placeholder: 'Password',
    isSecureEntry: true,
  },
  phoneNumber: {
    type: FieldType.PHONE,
    name: 'phoneNumber',
    placholder: 'Phone',
  },
  phoneNumber2: {
    type: FieldType.PHONE,
    name: 'phoneNumber2',
    placholder: 'Phone',
  },
  dateOfBirth: {
    type: FieldType.DATE,
    name: 'dateOfBirth',
    placholder: 'Date of Birth',
  },
};

const schemas = {
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string({message: 'required'}),
  dateOfBirth: z.string({message: 'required'}),
};

export const FORMS = {
  LOGIN: {
    fields: [
      fields?.email,
      fields?.password,
      fields?.phoneNumber,
      fields?.phoneNumber2,
      fields?.dateOfBirth,
    ],
    schema: z.object({
      email: schemas.email,
      password: schemas.password,
      phoneNumber: schemas.phoneNumber,
      phoneNumber2: schemas.phoneNumber,
      dateOfBirth: schemas.dateOfBirth,
    }),
    initialValues: {
      email: '',
      password: '',
      phoneNumber: '',
      phoneNumber2: '',
      dateOfBirth: '',
    },
  },
};
