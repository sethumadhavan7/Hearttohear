import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useLocation } from 'react-router-dom';

// Debugging utility
const createLogger = (prefix) => ({
  log: (...args) => console.log(`[${prefix}]`, ...args),
  error: (...args) => console.error(`[${prefix}]`, ...args)
});

const logger = createLogger('CallPage');

export default function CallPage({ Chats }) {
  const [isLoading, setIsLoading] = useState(true);
  const [callError, setCallError] = useState(null);
  const callContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Robust room ID generation
  const generateRoomID = useCallback(() => {
    const urlParams = new URLSearchParams(location.search);
    const roomIDFromURL = urlParams.get('roomID');
    
    logger.log('Room ID Generation', {
      urlRoomID: roomIDFromURL,
      storedRoomID: localStorage.getItem('callRoomID')
    });

    return roomIDFromURL || 
           localStorage.getItem('callRoomID') || 
           `room_${Math.random().toString(36).substr(2, 9)}`;
  }, [location.search]);

  const initializeZegoCall = useCallback(async (container) => {
    try {
      logger.log('Starting Zego Call Initialization');
      
      // Configuration parameters (REPLACE WITH YOUR ACTUAL CREDENTIALS)
      const APP_ID = 1152851638;
      const SERVER_SECRET = 'cb35e6c20ae9bd567e594464f548d4d2';
      
      // Generate unique identifiers
      const roomID = generateRoomID();
      const userID = `user_${Math.random().toString(36).substr(2, 9)}`;
      const userName = `User_${Math.floor(Math.random() * 1000)}`;

      // Persist room ID
      localStorage.setItem('callRoomID', roomID);
      logger.log('Generated IDs', { roomID, userID, userName });

      // Generate Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        APP_ID, 
        SERVER_SECRET, 
        roomID, 
        userID, 
        userName
      );

      // Create Zego instance with extensive configuration
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Advanced room joining configuration
      zp.joinRoom({
        container: container,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: false,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        
        // Detailed event handlers for debugging
        onReady: (userInfo) => {
          logger.log('Call Ready', userInfo);
          setIsLoading(false);
        },
        onLeaveRoom: () => {
          logger.log('Left Room');
          localStorage.removeItem('callRoomID');
          // Add your post-call logic here
        },
        onError: (error) => {
          logger.error('Zego Call Error', error);
          setCallError(error);
          setIsLoading(false);
        }
      });

    } catch (error) {
      logger.error('Initialization Failed', error);
      setCallError(error);
      setIsLoading(false);
    }
  }, [generateRoomID]);

  useEffect(() => {
    const safeInitializeCall = () => {
      if (callContainerRef.current) {
        logger.log('Container Ref Available, Initializing Call');
        initializeZegoCall(callContainerRef.current);
      } else {
        logger.error('Container Ref Not Available');
        setCallError(new Error('Container not found'));
      }
    };

    // Multiple initialization strategies
    const initializationStrategies = [
      () => setTimeout(safeInitializeCall, 100),
      () => window.addEventListener('load', safeInitializeCall),
      () => document.readyState === 'complete' && safeInitializeCall()
    ];

    initializationStrategies.forEach(strategy => strategy());

    return () => {
      window.removeEventListener('load', safeInitializeCall);
    };
  }, [initializeZegoCall]);

  // Render with extensive error handling and loading states
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: isLoading ? '#f0f2f5' : 'transparent'
    }}>
      {isLoading && <div>Initializing Call...</div>}
      
      {callError && (
        <div style={{ color: 'red', textAlign: 'center' }}>
          <h2>Call Initialization Error</h2>
          <p>{callError.message}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      <div 
        ref={callContainerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: isLoading || callError ? 'none' : 'block' 
        }} 
      />
    </div>
  );
}
