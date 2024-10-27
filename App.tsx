import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {FORMS, FieldType} from './src/HookForm';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from './src/components/Input';
import PhoneInput from 'react-native-phone-number-input';

const App = () => {
  const {
    control,
    getValues,
    setValue,
    setError,
    formState: {errors},
  } = useForm({
    defaultValues: FORMS.LOGIN.initialValues,
    resolver: zodResolver(FORMS.LOGIN.schema),
    mode: 'onBlur',
  });

  const inputRefs = FORMS.LOGIN?.fields?.map(_ => null);
  const phoneInputRefs = [];

  const handlePhoneInputChange = (fieldName, value) => {
    const relevantRef = phoneInputRefs?.find(
      input => input['fieldName'] === fieldName,
    );
    const {number, code} = relevantRef?.state;
    const isvalid = relevantRef.isValidNumber(value);
    isvalid
      ? setValue(fieldName, `+${code}${number}`, {
          shouldValidate: true,
        })
      : setError(fieldName, {message: 'Enter a valid phone number'});
  };

  return (
    <View style={styles.root}>
      {FORMS.LOGIN.fields?.map((field, index) => {
        return (
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => {
              return field?.type === FieldType.REGULAR ? (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors[field?.name] && errors[field?.name]['message']}
                  placeholder={field?.placeholder}
                  ref={ref => (inputRefs[index] = ref)}
                  onSubmitEditing={() => inputRefs[index + 1]?.focus()}
                  secureTextEntry={field?.isSecureEntry}
                />
              ) : field?.type === FieldType.PHONE ? (
                <>
                  <PhoneInput
                    ref={ref =>
                      phoneInputRefs?.push({...ref, fieldName: field?.name})
                    }
                    containerStyle={styles.phoneInputContainer}
                    textInputProps={{ref: ref => (inputRefs[index] = ref)}}
                    onChangeCountry={() => handlePhoneInputChange(field?.name)}
                    e
                    onChangeText={value =>
                      handlePhoneInputChange(field?.name, value)
                    }
                  />
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      {errors?.[field?.name] && errors[field?.name]['message']}
                    </Text>
                  </View>
                </>
              ) : field?.type === FieldType.DATE ? (
                <></>
              ) : null;
            }}
            name={field?.name}
          />
        );
      })}
      <Button
        title={'submit'}
        onPress={() => {
          console.log(getValues());
        }}
      />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  root: {
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fafa00',
    flex: 1,
  },
  phoneInputContainer: {
    borderWidth: 1,
    width: '100%',
  },
  errorContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    marginLeft: 7,
    maxWidth: '95%',
    lineHeight: 18,
    color: 'red',
  },
});
