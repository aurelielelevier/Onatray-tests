var app = require('../app');
var request = require('supertest');

test('signin talent', async(done)=>{
    
    let resTalent = await request(app)
        .post('/sign_in')
        .send({'email':'alskjf@a.test', 'password':'password'})
        .expect(200)
    expect(resTalent.body.type).toStrictEqual('talent')
    expect(resTalent.body.result).toStrictEqual(true)
    expect(resTalent.body.token).toBeDefined()
    done()
})

test('signin false informations', async(done)=>{
    let resFalse = await request(app)
        .post('/sign_in')
        .send({'email':'test@test.com', 'password':'aaa'})
        .expect(200)
    expect(resFalse.body.result).toStrictEqual('Error')
    done()
})
    
test('signin restaurant', async(done)=>{
    let resRestaurant = await request(app)
        .post('/sign_in')
        .send({'email':'test@test.com', 'password':'test'})
        .expect(200)
    expect(resRestaurant.body.type).toStrictEqual('restaurant')
    expect(resRestaurant.body.result).toStrictEqual(true)
    expect(resRestaurant.body.token).toBeDefined()
    done()
})