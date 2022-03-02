'use strict';

/**
 *  test-service controller
 */

const axios = require('axios')

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test-service.test-service', ({strapi}) => ({
    
    async find(ctx) {
        // some custom logic here


        // let request = new XMLHttpRequest();
        // request.open("GET", "http://localhost:2000/getdata");
        // request.send();
        // request.onload = () => {
        //     console.log(request);
        //     console.log(JSON.parse(request.response))
        // }
        // var res = fetch('http://localhost:2000/getdata')
        //     .then(response => {
        //         return response.json.data
        //     })

        console.log("NEWWWWW")
        // let res;
        // try {
        //     res = await getdata('http://localhost:2000/getdata');
        //     console.log(res)
        // } catch (e) {
        //     console.log("fail")
        // } 

        axios.get('http://localhost:2000/getdata')
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res.data)
            res.data.forEach(entry => {
                axios.post('http://localhost:1337/api/test-services', {data : entry})
                .then(inres => {
                    console.log(`statusCode: ${inres.status}`)
                    console.log(inres.data)
                })
                .catch(error => {
                    console.error(error)
                })
            });
        })
        .catch(error => {
            console.error(error)
        })

        ctx.query = { ...ctx.query, local: 'en' }
        
        // Calling the default core action
        const { data, meta } = await super.find(ctx);

        // some more custom logic
        meta.date = Date.now()
        return { data, meta };
    },
}));
