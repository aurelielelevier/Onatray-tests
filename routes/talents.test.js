var app = require('../app');
var request = require('supertest');

let token ='' 

test('create account', async(done)=>{
    let res = await request(app)
        .post('/talents/createAccount')
        .send({'firstName':'test', 'lastName':'TEST', 'email':'a@a.test', 'password':'password', 'phone':'0000000000'})
        // .expect(200)
    expect(res.body.token).toBeDefined()
    token = res.body.token
    done()
});

describe('wishlist', () => {
    test('ajout wishlist', async(done)=>{
        let result = await request(app)
            .post('/talents/whishlist')
            .send({'token': token, 'restaurant':'5fb6e99709a35300178d0c08'})
            .expect(200)
        
        expect(result.body.whishlist).toEqual(
            expect.arrayContaining(['5fb6e99709a35300178d0c08']),
        );
        done()
    })

    test('retrait wishlist', async(done)=>{
        let result = await request(app)
            .post('/talents/whishlist')
            .send({'token': token, 'restaurant':'5fb6e99709a35300178d0c08'})
            .expect(200)
        expect(result.body.whishlist).toEqual([]);
        done()
    })
})