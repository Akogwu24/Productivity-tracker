import { useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { errorToast } from '../components/common/notificationHandler';

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<GoogleLoginResponse | undefined>>;
};
const clientId = '80336867282-17up1c1gkmndrhjv8gn5uemk8g5p00bo.apps.googleusercontent.com';
// const cliendSecrete = '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';

export const Login = ({ setUser }: LoginProps) => {
  useEffect(() => {
    gapi.load('client:auth2', () => gapi.auth2.init({ clientId, scope: '' }));

    // const initClient = () => {
    //   gapi.auth2.init({ clientId, scope: '' });
    // };
    // gapi.load('client:auth2', initClient);
  }, []);

  const onSuccess = (data: any) => {
    // console.log('data', data);
    setUser(data);
  };
  const onFailure = (data: {}) => {
    console.log(data);
    errorToast('Something Went Wrong Try again');
  };

  return (
    <div className='google-login'>
      <GoogleLogin
        clientId={clientId}
        buttonText='Sign in with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};
