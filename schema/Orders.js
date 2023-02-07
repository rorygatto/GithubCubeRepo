cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,
  //sqlAlias: `o`,
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    orders1: {
      measures: [CUBE.count],
      dimensions: [CUBE.userId, CUBE.status],
      timeDimension: CUBE.createdAt,
      granularity: `day`,
    },
    ordersRollupJoin: {
      type: `rollupJoin`,
      measures: [CUBE.count],
      dimensions: [Users.firstName],
      rollups: [Users.users1, CUBE.orders1],
    },
  },
  joins: {
    Users: {
      sql: `${CUBE.userId} = ${Users.id}`,
      relationship: `belongsTo`
    },
    Products: {
      sql: `${CUBE}.product_id = ${Products}.id`,
      relationship: `belongsTo`
    }
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    },
    number: {
      sql: `number`,
      type: `sum`
    }
  },
  dimensions: {
    userId: {
      sql: `user_id`,
      type: `number`
    },
    productId: {
      sql: `product_id`,
      type: `number`
    },
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown:true
    },
    status: {
      sql: `status`,
      type: `string`
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    completedAt: {
      sql: `completed_at`,
      type: `time`
    }
  }
});