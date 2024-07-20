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
                <img src={""} alt="" />
                <h3>ChatPage</h3>
            </div>
            <div className="contacts">
                {currentUsername && (
                    contacts.map((item, index) => (
                        item.userName !== currentUsername && ( // Check if the username is not the current user's username
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
    height: 100vh;
    padding-top: 20px;
    color: white;
    display: grid;
    grid-template-rows: 10% 75% 15%;
    background-color: #2e7d32;
    
    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        img {
            width: 3rem;
        }

        h3 {
            color: white;
        }
    }

    .contacts {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
        gap: 1rem;

        &::-webkit-scrollbar {
            width: 0.2rem;

            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact {
            width: 90%;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            background-color: #388e3c;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;

            img {
                margin-left: 2rem;
                width: 3rem;
            }

            h4 {
                color: white;
            }
        }

        .contact:hover {
            background-color: #4caf50;
        }

        .selected {
            background-color: #66bb6a;
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
            }
        }
    }
`;

export default Contacts;
