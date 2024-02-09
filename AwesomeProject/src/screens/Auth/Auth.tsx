import React, {useState, useEffect, FC, useRef} from 'react';
import {
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  EventSubscription,
} from 'react-native';
import {connect} from 'react-redux';

import backgroundImage from '../../assets/background.jpg';
import {authStyles} from './AuthStyles';
import {HeadingText} from '../../components/UI/HeadingText/HeadingText';
import {MainText} from '../../components/UI/MainText/MainText';
import {AuthForm, ControlsType} from '../../components/AuthForm/AuthForm';
import {ButtonWithBackground} from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import {validateFormValue} from '../../utility/validation';
import {authFormControls} from './AuthFormControls';
import {tryAuth, authAutoSignIn} from '../../store/actions';
import SplashScreen from 'react-native-splash-screen';
import {Dispatch} from 'redux';

type Props = {
  isLoading: boolean;
  onTryAuth: (authData: any, authMode: string) => void;
  onAutoSignIn: () => void;
};

const AuthScreenComponent: FC<Props> = props => {
  const {isLoading, onTryAuth, onAutoSignIn} = props;
  const [controls, setControls] = useState<ControlsType>(authFormControls);
  const [authMode, setAuthMode] = useState('login');
  const [viewMode, setViewMode] = useState(
    Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
  );
  const dimensionChangeListener = useRef<EventSubscription | null>(null);

  useEffect(() => {
    // !DEBUG
    // console.log('Component did mount');
    dimensionChangeListener.current = Dimensions.addEventListener(
      'change',
      updateStyles,
    );
    onAutoSignIn();
    SplashScreen.hide();
  });

  useEffect(() => {
    return () => {
      // !DEBUG
      // console.log('Component will unmount');
      if (dimensionChangeListener.current) {
        dimensionChangeListener.current.remove();
      }
      // Dimensions.removeEventListener('change', updateStyles);
    };
  });

  useEffect(() => {
    setControls({
      ...controls,
      confirmPassword: {
        ...controls.confirmPassword,
        valid: validateFormValue(
          controls['confirmPassword'].value,
          'confirmPassword',
          controls,
        ),
      },
    });
  }, [controls, controls.password.value]);

  const updateStyles = (dims: any) => {
    setViewMode(dims.window.height > 500 ? 'portrait' : 'landscape');
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleAuth = () => {
    const authData = Object.keys(controls).reduce((sum, key: string) => {
      sum[key] = controls[key].value;
      return sum;
    }, {} as any);
    Keyboard.dismiss();
    onTryAuth(authData, authMode);
  };

  const updateInputState = (key: string, value: string) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        valid: validateFormValue(value, key, controls),
        pristine: false,
        value,
      },
    });
  };

  const checkFormValidity = () => {
    const isValid = Object.keys(controls).every(key => {
      return authMode === 'login' && key === 'confirmPassword'
        ? true
        : controls[key].valid;
    });
    return isValid;
  };

  const headingText =
    viewMode === 'portrait' ? (
      <MainText>
        <HeadingText style={{color: 'white'}}>
          Please {authMode === 'login' ? ' Sign Up' : ' Login'}
        </HeadingText>
      </MainText>
    ) : null;

  const submitButton = isLoading ? (
    <ActivityIndicator />
  ) : (
    <ButtonWithBackground disabled={!checkFormValidity()} onPress={handleAuth}>
      Submit
    </ButtonWithBackground>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={authStyles.backgroundImage}>
      <KeyboardAvoidingView style={authStyles.container} behavior="height">
        {headingText}

        <ButtonWithBackground onPress={switchAuthMode}>
          Switch to {authMode === 'login' ? ' Sign Up' : ' Login'}
        </ButtonWithBackground>

        <AuthForm
          controls={controls}
          authMode={authMode}
          viewMode={viewMode}
          onFormChange={updateInputState}
        />

        {submitButton}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const mapStateToProps = (state: any) => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onTryAuth: (authData: any, authMode: any) =>
    dispatch(tryAuth({authData, authMode})),
  onAutoSignIn: () => {
    dispatch(authAutoSignIn());
  },
});

export const AuthScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthScreenComponent);
