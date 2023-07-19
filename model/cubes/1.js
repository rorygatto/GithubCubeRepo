cube(`OtherCompanies`, {
  dataSource: 'ecomcompanies',
  sql: `SELECT * from companies`,
  preAggregations: {
    // companiesRollup: {
    //   dimensions: [Companies.name, Companies.number_of_employees],
    //   indexes: {
    //     index: {
    //       columns: [CUBE.name],
    //     },
    //   },
    // },
  },
  measures: {
    count: {
      type: `count`
    }
  },
  dimensions: {
    name: {
      sql: `name`,
      type: `string`,
      primaryKey: true,
      shown: true
    },
    number_of_employees:{
      sql: `number_of_employees`,
      type: `number`
    },
    size: {
      type: `string`,
      case: {
        when: [
          { sql: 'number_of_employees < 100', label: 'Small' },
          { sql: 'number_of_employees > 101 AND number_of_employees < 1000', label: 'Medium' }
        ], else: {
          label: 'Big'
        }
      }
    }
  },
});


