import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import Api from '../Api/Api';

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

const RatingPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  .star-container {
    display: flex;
    margin: 1rem 0;
  }

  .star {
    font-size: 2rem;
    color: #ddd;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .star.selected,
  .star:hover {
    color: #f39c12;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #388e3c;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #66bb6a;
    }
  }
`;

export default function CallPage({ Chats }) {
  const [rating, setRating] = useState('');
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const callContainerRef = useRef(null);
  const navigate = useNavigate();

  const startCall = (element) => {
    const appID = 756401678;
    const serverSecret = 'd02c2c9ff860f9a7de482335e058a650';
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
        const userDetails = JSON.parse(localStorage.getItem('Mental-App'));
        if (userDetails && userDetails.role === 'client') {
          setShowRatingPrompt(true);
        } else if (userDetails && userDetails.role === 'helper') {
          navigate('/helper');
        }
      },
    });
  };

  useEffect(() => {
    if (callContainerRef.current) {
      startCall(callContainerRef.current);
    }
  }, [callContainerRef]);

  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  const handleRatingSubmit = async () => {
    try {
      await Api.patch(`/update/rating/${Chats._id}`, { rating: selectedRating });
      alert(`Rating submitted: ${selectedRating}`);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
    setRating(selectedRating);
    setShowRatingPrompt(false);
    navigate('/client');
  };

  return (
    <Container>
      {showRatingPrompt ? (
        <RatingPrompt>
          <h3>Rate your call</h3>
          <div className="star-container">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${selectedRating >= value ? 'selected' : ''}`}
                onClick={() => handleStarClick(value)}
              >
                ★
              </span>
            ))}
          </div>
          <button onClick={handleRatingSubmit}>Submit</button>
        </RatingPrompt>
      ) : (
        <div
          className="myCallContainer"
          ref={callContainerRef}
          style={{ width: '100vw', height: '100vh' }}
        ></div>
      )}
    </Container>
  );
}
