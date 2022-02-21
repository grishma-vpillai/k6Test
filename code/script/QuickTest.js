//Executing with 'ramping-vus' 

import { sleep, group,check } from 'k6'
import http from 'k6/http'

export const options = {
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '10s',
      stages: [

        { duration: '1m', target: 10 },
    
        { duration: '1m', target: 20 },
    
        { duration: '1m', target: 0 },
    
      ],
      gracefulRampDown: '10s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  // To login to the application  by providing the email id and password.
  // Using  Json string as body
  group('Login  to Application', function () {
    response = http.post(
      'https://prod-api.stylishop.com/rest/customer/v4/login',
      '{"isStandaloneLogin":false,"loginType":"EMAIL_LOGIN","password":"Sapient@202","useridentifier":"greeshma.jv99@gmail.com","socialLoginDetails":{},"ageGroupId":1,"websiteId":3}',
      {
        headers: {
          host: 'prod-api.stylishop.com',
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          origin: 'https://stylishop.com',
          connection: 'keep-alive',
        },
      }
      // check(response, {
      //   'status is 200': (r) => r.status === 200
      //   })
    )
    // To suspend the VU execution for specified time
    sleep(1.0)
      
  }
  )
  // To add intem to the cart 
  group('Add Item to Cart ', function () {
    response = http.post(
    'https://prod-api.stylishop.com/rest/quote/auth/v5',
    '{"storeId":7,"source":0,"customerId":2965985,"addToQuoteProductsRequests":[{"sku":"1048163603","parentSku":"10481636","quantity":1,"caSource":"plp","caSourceType":"context","caSourceValue":"t2020-regular-t-shirts-w","caBannerPromoName":"1","overrideQuantity":true}]}',
    {
      headers: {
        host: 'prod-api.stylishop.com',
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
        origin: 'https://stylishop.com',
        connection: 'keep-alive',
      },
    }
    // check(response, {
    //   'status is 200': (r) => r.status === 200
    //   })
  )
  // To suspend the VU execution for specified time
  sleep(1.0)
       
}
)
// Increase the item count in the cart.
group('Increase Item Count in Cart', function () {

  response = http.put(
    'https://prod-api.stylishop.com/rest/quote/auth/v5',
    '{"sku":"1048163603","quantity":2,"quoteId":"1645429892695317","storeId":7,"customerId":2965985}',
    {
      headers: {
        host: 'prod-api.stylishop.com',
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
        origin: 'https://stylishop.com',
      },
    }
  // check(response, {
  //   'status is 200': (r) => r.status === 200
  //   })
)
// To suspend the VU execution for specified time
sleep(1.0)

}
)

}