# MENTAL HEALTH APPLICATION

## Overview
Mental Health Application is a platform designed to provide accessible mental health support by connecting individuals experiencing depression with compassionate volunteers. This community-driven solution leverages technology to facilitate meaningful connections, ensuring timely and personalized support. Volunteers are recognized for their contributions through a token-based reward system recorded securely on a blockchain.

## Problem Statement
In today's fast-paced world, many individuals experience depression and mental health challenges, often feeling isolated and unsupported. Access to professional mental health services can be limited due to barriers such as cost, stigma, and availability. Our platform aims to bridge this gap by connecting individuals with supportive volunteers, providing an accessible and community-driven solution to mental health support.

## Uniqueness and Innovativeness
1. **Community Empowerment**: Fosters a sense of community by connecting users with volunteers and recognizing their contributions through a token-based reward system.
2. **Blockchain Transparency**: Utilizes blockchain technology to record transactions, ensuring transparency and trust in the reward system.

## Solution
```
             ┌───────────────┐
             │   Homepage    │
             └─────┬─────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
   ┌─────▼─────┐       ┌─────▼─────┐
   │ Register  │       │   Login    │
   └─────┬─────┘       └─────┬─────┘
         │                   │
┌────────▼────────┐   ┌──────▼─────┐
│ Choose Role:    │   │Enter Email &│
│  User /Volunteer│   │   Password  │
└────────┬────────┘   └──────┬──────┘
         │                   │
┌────────▼────────┐   ┌──────▼─────┐
│Enter Preferences│   │  Dashboard │
│ (Based on Role) │   │ (Based on  │
└────────┬────────┘   │    Role)   │
         │            └──────┬─────┘
         │                   │
┌────────▼────────┐   ┌──────▼─────┐
│  Profile Created │   │    Browse   │
│  (User/Volunteer)│   │Profiles/Reqs│
└────────┬────────┘   └──────┬─────┘
         │                   │
         └─────────┬─────────┘
                   │
        ┌──────────▼─────────┐
        │  Matching Process  │
        │ (Preferences & Avail.) │
        └──────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │   Support Session │
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │   Post-Session    │
         │  (Feedback & Token│
         │    Rewards)       │
         └───────────────────┘
```

### In Words
1. **Homepage**
   - Options: Register | Login

2. **Register**
   - Enter User Details (Name, Email, Password, etc.)
   - Choose Role: User | Volunteer
     - **If User**:
       - Enter Preferences (Availability, Language, Specific Needs)
       - Profile Creation
     - **If Volunteer**:
       - Enter Preferences (Availability, Language, Areas of Expertise)
       - Profile Creation

3. **Login**
   - Enter Email & Password
   - Redirect to Dashboard (Based on Role: User | Volunteer)

4. **Dashboard**
   - **If User**:
     - Browse Volunteer Profiles
     - Schedule Call
   - **If Volunteer**:
     - Browse User Requests
     - Accept Request

5. **Matching Process**
   - Algorithm matches Users with Volunteers based on Preferences and Availability

6. **Support Session**
   - Conduct Call/Chat Session

7. **Post-Session**
   - Feedback from User
   - Token Rewards for Volunteers (Based on Duration and Positive Feedback)
   - Record Transactions on Blockchain

## Tech Stack
- **Web Development**: Frontend (React.js) / Backend (Node.js & MongoDB)
- **Blockchain**: Token rewards system (Solidity, Web3.js, MetaMask)
- **Real-time Communication**: Live messaging and support sessions (Socket.io, Zegacloud API)

## Key Benefits
1. **Enhanced Accessibility to Mental Health Support**
   - **Wider Reach**: Provided mental health support to individuals who might otherwise have limited access due to geographical, financial, or social barriers.
   - **Timely Help**: Ensured timely support, potentially preventing the worsening of depressive symptoms.

2. **Innovative Use of Technology**
   - **Blockchain for Transparency**: Utilized blockchain technology for recording transactions, ensuring transparency and trust in the reward system, enhancing volunteer satisfaction.

3. **Reduction of Mental Health Stigma**
   - **Community Awareness**: Fostered open conversations about mental health and involved community members as volunteers, helping to normalize mental health issues and reduce associated stigma.

## Getting Started
### Prerequisites
- Node.js
- npm or yarn
- MongoDB
- MetaMask or other Ethereum wallet

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/aalan294/CODEBYTE-HACKATHON---MENTAL-HEALTH.git
   ```
2. Install dependencies for both client and server:
   ```
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Create a `.env` file in the server directory and add the following variables:
   ```
   MONGO_URI=your_mongodb_uri
   PORT=3500
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application
1. Start the server:
   ```
   cd server
   npm run dev
   ```
2. Start the client:
   ```
   cd client
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Usage
1. Register or login to your account.
2. Complete the profile setup based on your role (User/Volunteer).
3. Browse profiles or requests and initiate support sessions.
4. Provide feedback and earn token rewards as a volunteer.

## Hosted Application
- [Live Application](https://mental-health-frontend-ft9t.onrender.com/) (Please note: Since the application is hosted on a free server on Render, it may take up to 50 seconds for the first response. There will be no delay after that.)

## Blockchain Transactions
- [View on Etherscan](https://sepolia.etherscan.io/address/0x3aD89DDe7e823a23D1518D841B3e34E14D209320)

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments
- Special thanks to all contributors and supporters.
