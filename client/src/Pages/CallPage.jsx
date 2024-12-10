import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useLocation } from 'react-router-dom';
import Api from '../Api/Api'

function randomID(len = 5) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default function CallPage({ Chats }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const callContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const generateRoomID = useCallback(() => {
    // Check if roomID exists in URL or localStorage
    const urlParams = new URLSearchParams(location.search);
    const storedRoomID = localStorage.getItem('current-room-id');
    const roomID = urlParams.get('roomID') || storedRoomID || randomID(5);
    
    // Store in localStorage for persistence
    localStorage.setItem('current-room-id', roomID);
    return roomID;
  }, [location.search]);

  const startCall = useCallback(async (element) => {
    try {
      setIsLoading(true);
      
      // Ensure ZegoCloud is fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));

      const appID = 1152851638;
      const serverSecret = 'cb35e6c20ae9bd567e594464f548d4d2';
      const roomID = generateRoomID();
      const userID = randomID(5);
      const userName = randomID(5);

      // Generate kit token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        roomID, 
        userID, 
        userName
      );

      // Create Zego instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join room with extended configuration
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
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        showPreJoinView: false, // Bypass pre-join screen
        onReady: () => {
          console.log('Call started successfully');
          setIsLoading(false);
        },
        onLeaveRoom: () => {
          // Handle call end
          const userDetails = JSON.parse(localStorage.getItem('Mental-App'));
          if (userDetails && userDetails.role === 'client') {
            setShowRatingPrompt(true);
          } else if (userDetails && userDetails.role === 'helper') {
            navigate('/helper');
          }
          // Clear stored room ID
          localStorage.removeItem('current-room-id');
        },
        onError: (error) => {
          console.error('Zego Call Error:', error);
          setIsLoading(false);
          alert('Failed to join the call. Please try again.');
        }
      });
    } catch (error) {
      console.error('Call initialization error:', error);
      setIsLoading(false);
      alert('Could not initialize the call. Please check your connection.');
    }
  }, [generateRoomID, navigate]);

  useEffect(() => {
    // Robust call initialization
    const initializeCall = () => {
      if (callContainerRef.current) {
        startCall(callContainerRef.current);
      } else {
        // Retry initialization if ref is not ready
        setTimeout(initializeCall, 300);
      }
    };

    // Start initialization process
    initializeCall();

    // Cleanup function
    return () => {
      // Any cleanup logic if needed
      setIsLoading(false);
    };
  }, [startCall]);

  const handleRatingSubmit = async () => {
    try {
      await Api.patch(`/update/rating/${Chats._id}`, { rating: selectedRating });
      alert(`Rating submitted: ${selectedRating}`);
      navigate('/client');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  // Render loading overlay or call container
  return (
    <Container>
      {isLoading && (
        <LoadingOverlay>
          <div>Initializing Call...</div>
        </LoadingOverlay>
      )}

      <div
        ref={callContainerRef}
        style={{ 
          width: '100vw', 
          height: '100vh', 
          display: isLoading ? 'none' : 'block' 
        }}
      />

      {/* Rating prompt logic remains the same if needed */}
    </Container>
  );
}
