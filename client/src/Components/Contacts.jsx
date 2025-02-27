import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import profile from '../img/profile.svg';

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUsername(currentUser.userName);
        }
    }, [currentUser]);

    const changeCurrentChat = (item, index) => {
        setCurrentSelected(index);
        changeChat(item);
    };

    return (
        <Container>
            <div className="brand">
                <h3>ChatPage</h3>
            </div>
            <div className="contacts">
                {currentUsername && (
                    contacts.map((item, index) => (
                        item.userName !== currentUsername && (
                            <div
                                key={index}
                                className={`contact ${currentSelected === index ? "selected" : ""}`}
                                onClick={() => changeCurrentChat(item, index)}
                            >
                                <img src={profile} alt="" />
                                <h4>{item.userName}</h4>
                            </div>
                        )
                    ))
                )}
            </div>
        </Container>
    );
};

const Container = styled.div`
    overflow: hidden;
    height: 100%;
    padding-top: 20px;
    color: white;
    display: grid;
    grid-template-rows: 10% 75% 15%;
    background-color: #8a2be2;
    border: 2px solid white;
    border-radius: 10px;
    
    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 1rem;

        h3 {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }
    }

    .contacts {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        gap: 1rem;

        &::-webkit-scrollbar {
            width: 0.3rem;

            &-thumb {
                background-color: #ffffff39;
                border-radius: 1rem;
            }
        }

        .contact {
            width: 85%;
            padding: 0.6rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            background-color: white;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
            box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.2);

            img {
                margin-left: 1rem;
                width: 3rem;
                border-radius: 50%;
                border: 2px solid #6a0dad;
            }

            h4 {
                color: #6a0dad;
                font-size: 1.2rem;
                font-weight: bold;
            }
        }

        .contact:hover {
            background-color: #7b68ee;
            color: white;
        }

        .selected {
            background-color: #6a0dad;
            color: white;
        }
    }

    .user {
        display: flex;
        justify-content: center;
        align-items: center;

        .userCard {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            align-items: center;

            img {
                width: 4rem;
                border-radius: 50%;
                border: 2px solid white;
            }
        }
    }
`;

export default Contacts;
