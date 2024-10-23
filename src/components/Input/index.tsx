import React, {useCallback, forwardRef} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';

export default forwardRef(
  (
    {
      error,
      isPassword = false,
      editable = true,
      onPress,
      label = '',
      value = '',
      onChangeText = undefined,
      rightIcon = null,
      placeholder = '',
      containerStyles = {},
      showErrorPadding = true,
      ...props
    },
    ref,
  ) => {
    const onFocusHandler = useCallback(() => {
      props?.onFocus?.();
    }, [props?.onFocus]);

    const onBlurHandler = useCallback(
      e => {
        props?.onBlur?.(e);
      },
      [props?.onBlur],
    );

    return (
      <Pressable style={[styles.main, containerStyles]} onPress={onPress}>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            {...props}
            autoCapitalize="none"
            onPressIn={onPress}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            placeholder={placeholder}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{!!error && error}</Text>
        </View>
      </Pressable>
    );
  },
);
const styles = StyleSheet.create({
  main: {
    marginBottom: 8,
  },
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
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
  placeHolderText: {},
  leftIconStyle: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  inputWrapper: {justifyContent: 'center', borderWidth: 1, padding: 10},
});
