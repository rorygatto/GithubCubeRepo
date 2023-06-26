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