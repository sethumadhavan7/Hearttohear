import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';

function randomID(len = 5) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #8a2be2, #ffffff);
`;

export default function CallPage() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const callContainerRef = useRef(null);
  const navigate = useNavigate();

  const startCall = (element) => {
    const appID = 1865204885;
    const serverSecret = 'ff753a5e5e2ee52eb69f23c5f115a630';
    const userID = randomID(5);
    const userName = randomID(5);
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}/#/test${window.location.pathname}?roomID=${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onReady: () => {
        console.log('Call started at:', Date.now());
      },
      onLeaveRoom: () => {
        console.log('Call ended at:', Date.now());
        navigate('/client');
      },
    });
  };

  useEffect(() => {
    if (callContainerRef.current) {
      startCall(callContainerRef.current);
    }
  }, [callContainerRef]);

  return (
    <Container>
      <div ref={callContainerRef} style={{ width: '100vw', height: '100vh' }}></div>
    </Container>
  );
}
