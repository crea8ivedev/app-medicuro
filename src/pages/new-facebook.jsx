// FacebookAuth.tsx
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookAuth = () => {
  const handleFacebookResponse = async (response) => {
    const { accessToken, userID } = response;

    if (!accessToken) {
      console.error('Facebook login failed', response);
      return;
    }

    try {
      const res = await fetch('/api/auth/login/facebook/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important if you're using session-based auth
        body: JSON.stringify({ access_token: accessToken }),
      });

      const data = await res.json();
      console.log('✅ Backend response:', data);
      // You can now store user or redirect
    } catch (err) {
      console.error('❌ Failed to send token to backend:', err);
    }
  };

  return (
    <div>
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        icon="fa-facebook"
        textButton=" Login with Facebook"
      />
    </div>
  );
};

export default FacebookAuth;
