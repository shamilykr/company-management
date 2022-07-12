# company-management

React based web application to manage company details - using react, MUI, redux and redux-toolkit

Used react redux persist to simulate the backend.
Used react router dom for navigation.

SSO using Firebase, and included  google login as well as email login.
Defined theme using MUI.

- Having a add company form
    Form fields will be:
        Company Name
        Company Domain.
        Company Sector (A pre-filled list of values, shown in a single select dropdown).

    Data is saved in redux store and persist it using redux persist.

- Listing page with all companies added, a table with 3 values added.


## Development
```
replace firebase keys in .env file with actual values
npm install
npm run start
```

## Test cases
npm run test

