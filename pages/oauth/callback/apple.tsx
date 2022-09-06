import React, { useEffect } from 'react';

const AppleAuth = () => {
  useEffect(() => {
    // Listen for authorization success.
    /* eslint-disable @typescript-eslint/no-explicit-any */
    document.addEventListener('AppleIDSignInOnSuccess', (event: any) => {
      // Handle successful response.
      alert(event.detail.data);
    });

    // // Listen for authorization failures.
    // /* eslint-disable @typescript-eslint/no-explicit-any */
    document.addEventListener('AppleIDSignInOnFailure', (event: any) => {
      // Handle error.
      alert(event.detail.error);
    });
  }, []);

  return <div />;
};

export default AppleAuth;
