import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, } from '@apollo/client'
import * as Realm from "realm-web";
import { BrowserRouter } from "react-router-dom";

const env_configs = {
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/graphql",
  SHOW_DOB_POPUP: (process.env.REACT_APP_SHOW_DOB_POPUP === 'true') || false,
}



// Check out app.js for examples of how to run GraphQL operations


// To set up your app:
//
// 1. Link a cluster that includes the MongoDB Atlas sample data sets
// 2. Configure permissions for the ``sample_mflix.movies`` collection. For this
//    demo, you can assign full read/write permissions to the default role.
// 3. Generate a collection schema for the ``sample_mflix.movies`` collection.
// 4. Enable anonymous authentication
// 5. Deploy your changes
//
// Once your app is set up, replace the value of APP_ID with your App ID
export const APP_ID = "vape-finder-gdfit";

// Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  
  return app.currentUser.accessToken;
}

console.log("env configs: ", env_configs)

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/vape-finder-gdfit/graphql`,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      tagmetadata: {
        keyFields: ["type_name"],
      },
      Query: {
        fields: {
          getSortedProducts: {
           read(existing, { args, toReference }) { //read() is always executed before the callout, and then again after callout, and then merge() is called
            //console.log("CACHE READ: args: ", args, " existing: ", existing)
            //debugger;
            return existing;      
          },
          //keyArgs: ["input", ["categories","brands","last_product_ids","stores","last_product_price","limit","sort_by"]] //the values of these args in input{} determine the cache retreival key
            keyArgs: ["input", ["categories","brands","stores","sort_by"]], //this pattern is how to define keys nested within an object:(input:{categories, brands, stores, sort_by,})          
            merge(existing = [], incoming) {
              console.log("CACHE MERGE: existing: ", existing.length, " incoming: ", incoming)
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  }),
  defaultOptions: {
      watchQuery: {
        nextFetchPolicy(currentFetchPolicy) {
          return currentFetchPolicy;
        },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App {...env_configs} />
      </BrowserRouter>
  </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
nextFetchPolicy(
        currentFetchPolicy,
        {
          // Either "after-fetch" or "variables-changed", indicating why the
          // nextFetchPolicy function was invoked.
          reason,
          // The rest of the options (currentFetchPolicy === options.fetchPolicy).
          options,
          // The original value of options.fetchPolicy, before nextFetchPolicy was
          // applied for the first time.
          initialPolicy,
          // The ObservableQuery associated with this client.watchQuery call.
          observable,
        }
      ) {
       // console.log("////INSIDE NEXTFETCHPOLICY////")
       // console.log("initialPolicy", initialPolicy)
       // console.log("reason: ", reason)
       // console.log("options:", options)
        //currentFetchPolicy.options.fetchPolicy = "cache-first"
        return currentFetchPolicy ;
      }
*/
