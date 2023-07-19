// // Cube.js configuration options: https://cube.dev/docs/config
// function addDimstoOrderBy(query) {
//   // Code to handle sort order for pagination
//   // We need to make sure dimensions are included in sorting AFTER order!
//   let orderDims = new Array();
//   for (let i = 0; i < query.order.length; i++) {
//     let originalOrder = query.order[i];
//     orderDims.push(originalOrder[0]);
//   };
//   for (let i = 0; i < query.dimensions.length; i++) {
//     let queryDim = query.dimensions[i];
//     if (!orderDims.includes(queryDim)) {
//       query.order.push([queryDim,'asc']);
//       }
//   };
//   return query;
// }
// module.exports = {
//   queryRewrite: (query, { securityContext }) => {
//     // Fix the ordering
//     query = addDimstoOrderBy(query);
//     // Return the query
//     return query;
//   },
// };


const PostgresDriver = require("@cubejs-backend/postgres-driver");
module.exports = {
      driverFactory: ({ dataSource }) => {
        return new PostgresDriver({
        host: 
        dataSource === "ecomcompanies"
            // ? '104.154.137.141'
            ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_HOST
            : process.env.CUBEJS_DB_HOST,
        database:
            dataSource === "ecomcompanies"
            // ? 'ecom_companies'
            ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_NAME
            : process.env.CUBEJS_DB_NAME,
        username:
            dataSource === "ecomcompanies"
            // ? 'cube'
            ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_USER
            : process.env.CUBEJS_DB_USER,
        password:
            dataSource === "ecomcompanies"
            // ? '12345'
            ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_PASS
            : process.env.CUBEJS_DB_PASS,
        });
    },
    dbType: ({ dataSource }) => "postgres",
};

// CUBEJS_DATASOURCES default,ecomcompanies
