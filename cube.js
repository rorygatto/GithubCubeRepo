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


// const PostgresDriver = require("@cubejs-backend/postgres-driver");
// module.exports = {
//       driverFactory: ({ dataSource }) => {
//         return new PostgresDriver({
//         host: 
//         dataSource === "ecomcompanies"
//             // ? '104.154.137.141'
//             ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_HOST
//             : process.env.CUBEJS_DB_HOST,
//         database:
//             dataSource === "ecomcompanies"
//             // ? 'ecom_companies'
//             ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_NAME
//             : process.env.CUBEJS_DB_NAME,
//         username:
//             dataSource === "ecomcompanies"
//             // ? 'cube'
//             ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_USER
//             : process.env.CUBEJS_DB_USER,
//         password:
//             dataSource === "ecomcompanies"
//             // ? '12345'
//             ? process.env.CUBEJS_DS_ECOMCOMPANIES_DB_PASS
//             : process.env.CUBEJS_DB_PASS,
//         });
//     },
//     dbType: ({ dataSource }) => "postgres",
// };
// // CUBEJS_DATASOURCES default,ecomcompanies


//To get values out of nested objects
function extractElementsIntoArray(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return [obj];
  }
  const resultsArray = [];
  Object.values(obj).forEach(value => {
    if (typeof value === 'object' && value !== null) {
      resultsArray.push(...extractElementsIntoArray(value));
    } else {
      resultsArray.push(value);
    }
  });
  return resultsArray;
}

module.exports = {
  queryRewrite: (query, { securityContext }) => {
    //For this variable, 1 means security, 0 means no security.
    let byPassSecurity = 0;

    //1. Get a list of all dimensions, measures, and segments in the query.
    let fieldList = [];
    if(query.dimensions){
      fieldList.push(...query.dimensions);
    };
    if(query.measures){
      fieldList.push(...query.measures);
    };
    if(query.segments){
      fieldList.push(...query.segments);
    };
    if(query.filters){
      const queryFiltersFlattened = extractElementsIntoArray(query.filters);
      fieldList.push(...queryFiltersFlattened)
    };

    //2. Get cubes associated with those fields.
    let cubeList = [];
    if (fieldList.length > 0) {
      fieldList.map((item, index) => {
        let myField = fieldList[index];
        let myCube = myField.split(".")[0];
        cubeList.push(myCube);
        });
    }

    //3.a. Define which cube doesn't require security. (case sensitive!)
    let noSecurityCube = 'Orders'; // The orders cube.
    //3.b. Check list for cubes that require security context.
    for (let i = 0; i < cubeList.length; i++){
      //If cube === Orders, then do nothing.
      if(cubeList[i] !== noSecurityCube){
        //If cube !== Orders, then we will require security context.
        byPassSecurity = 1;
      }
    }

    // 4. After checking all cubes, if none of them required security context, pass on the query as-is.
    if (byPassSecurity === 0){
      return query
    }

    //5. If cubes required security context, rewrite the query.
    if (securityContext.user_id) {
      query.filters.push({
        member: "Users.uid",
        operator: "equals",
        values: [securityContext.user_id],
      });
    }
    return query;
  },
};

// module.exports = {
//   queryRewrite: (query, { securityContext }) => {

//     //1. Get a list of all dimensions, measures, and segments in the query.
//     let fieldList = [];
//     if(query.dimensions){
//       fieldList.push(...query.dimensions);
//     };
//     if(query.measures){
//       fieldList.push(...query.measures);
//     };
//     if(query.segments){
//       fieldList.push(...query.segments);
//     };

//     //2. Get cubes associated with those fields.
//     let cubeList = [];
//     if (fieldList.length > 0) {
//       fieldList.map((item, index) => {
//         let myField = fieldList[index];
//         let myCube = myField.split(".")[0];
//         cubeList.push(myCube);
//         });
//     }

//     //3.a. Define which need  filter. (case sensitive!)
//     //let filterCubes = ['Orders', 'Prodcuts', 'Users'];
//     let hasOrders = 0;
//     let hasProducts = 0;
//     //3.b. Check list for cubes that require security context.
//     for (let i = 0; i < cubeList.length; i++){
//       //If cube === Orders, then do nothing.
//       if(cubeList[i] == 'Orders' || cubeList[i] == 'Products'){
//         if(cubeList[i] == 'Orders'){
//           hasOrders = 1
//         }
//         else if(cubeList[i] == 'Products'){
//           hasProducts = 1
//         }
//       }
//     }

//     //If query had fields from 'Orders' || 'Prodcuts' || 'Users', then we will require security context.
//     if(hasOrders === 1) {query.filters.push ({
//       "member": "Orders.userId",
//       "operator": "equals",
//       "values": [securityContext.user_id]
//     });};
//     if(hasProducts === 1) {query.filters.push ({
//       "member": "Products.userId",
//       "operator": "equals",
//       "values": [securityContext.user_id]
//     });};

//     //5. If cubes required security context, rewrite the query.
//     if (!securityContext.user_id) {
//       throw new Error ('no user_id found');
//     }
//     else{
//       query.filters.push({
//         member: "Users.uid",
//         operator: "equals",
//         values: [securityContext.user_id],
//       });
//     }
//     return query;
//   },
// };

// //Function to get values out of nested objects
// function extractElementsIntoArray(obj) {
//   if (typeof obj !== 'object' || obj === null) {
//     return [obj];
//   }
//   const resultsArray = [];
//   Object.values(obj).forEach(value => {
//     if (typeof value === 'object' && value !== null) {
//       resultsArray.push(...extractElementsIntoArray(value));
//     } else {
//       resultsArray.push(value);
//     }
//   });
//   return resultsArray;
// }

// module.exports = {
//   queryRewrite: (query, { securityContext }) => {
//     // // console.log('securty context:' + JSON.stringify(securityContext));
//     // // bypass queryRewrite
//     // if(securityContext && securityContext.isSqlUser) {
//     //   return query;
//     // }

//     //1. Get a list of all dimensions, measures, and segments in the query.
//     let fieldList = [];
//     if(query.dimensions){
//       fieldList.push(...query.dimensions);
//     };
//     if(query.measures){
//       fieldList.push(...query.measures);
//     };
//     if(query.segments){
//       fieldList.push(...query.segments);
//     };
//     if(query.filters){
//       //fieldList.push(...query.filters.map(filter => filter.member));
//       const queryFiltersFlattened = extractElementsIntoArray(query.filters);
//       fieldList.push(...queryFiltersFlattened)
//     };

//     //2. Get cubes associated with those fields.
//     // let cubeSet = new Set();
//     // if (fieldList.length > 0) try {
//     //   fieldList.map((item, index) => {
//     //     let myField = fieldList[index];
//     //     let myCube = myField.split(".")[0];
//     //     cubeSet.add(myCube);
//     //     });
//     // } catch(error){console.log(error)}
//     // let cubeList = Array.from(cubeSet);
//     // console.log(cubeList)
//     let cubeSet = new Set();
//     if (fieldList.length > 0) {
//       fieldList.forEach(item => {
//         // make sure the item is a contains a cube name
//         if (item.includes(".")) {
//           let myCube = item.split(".")[0];
//           cubeSet.add(myCube);
//         }
//       });
//     }
//     let cubeList = Array.from(cubeSet);
//     console.log(cubeList);
//   }
// }