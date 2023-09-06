# Twitter Clone
### Developer: Rayyan Shaik
### [Live Demo Link](https://twitter-clone-20n.pages.dev/)

# Project Summary
This is a fullstack project that serves as a clone of the social media website [twitter](https://twitter.com/)

The frontend code is written in javascript and utilizes React + ChakraUI

The backend code is also written in javascript and connects to Google Firebase

Visually, I tried my best to make the website a 1:1 copy of twitter. Functionally, most core featuers of twitter have been implemented and site is fully functional as a social media website.

# Features

#### Frontend
* React.js with components, and ChakraUI for UI
* Mobile responsive and adjusts for various desktop sizes

#### Backend
* User registration through _Google Auth_ -> full login/logout functionality
* Permissions, authentication, and authorization are consistent throughout website
* Google _Firestore_ is used as the database
* Most Firestore calls are made and authorized through Google _Cloud Functions_

#### Full-stack
* Frontend makes queries and post requests to _Firestore_ through _Cloud Functions_

#### Misc.
* Site is deployed on _Cloudflare_ @ [https://twitter-clone-20n.pages.dev/](https://twitter-clone-20n.pages.dev/)
 
* Individual profile pages + profile editing 
* Complete like + comment functionality
* User tagging (@username) and hashtags (#hashtag) functionality
* Posts & profiles can be visited at custom urls
* Users can follow one another and view a "Following" feed

##### Usability Notice

Some buttons appear for visual purposes only and may not have a feature behind them (as of writing this). For example, the "notification" and "bookmark" icons are both visable, yet do not currently support their intended features (yet).

### Time spent developing

###### Time Frame : 08/30/2023 to 09/04/2023

###### Hours Developing: ~18 hours


### Running this project

#### [Live Demo Link](https://twitter-clone-20n.pages.dev/)

#### Steps to run locally

npm (node package manager) is required

1. Clone this repository
2. Navigate to the `/frontend` directory
3. run `npm install`
4. run `npm run dev`
5. Open the provided `localhost` link in a browser