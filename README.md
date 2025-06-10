<h2>Travelmate</h2>
This is a collaborative project for the ebusiness module in the 6th semester at Hochschule Karlsruhe.
Built with React, TypeScript and Material-UI.

<h3> Documentation </h3>
For Api Documentation please visit

<a>https://documenter.getpostman.com/view/30279781/2sB2j1gXiP</a>



<h2> Deployment </h2>

Install dependencies:

```shellscript
npm install
```
Start REST Api:
 
```shellscript
npm run api -w backend
```

<h2> Reset Database </h2>

1. Delete DB

2. Restart API, so TypeORM can create Tables

```shellscript
npm run api -w backend
```

3. Populate DB

```shellscript
npx ts-node ./backend/populate.ts
```

