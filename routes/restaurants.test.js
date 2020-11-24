var app = require('../app');
var request = require('supertest');

let token ='' 

test('create account', async(done)=>{
    let res = await request(app)
        .post('/restaurants/createAccount')
        .send({'restaurantEmail':'test@test.com', 'restaurantPassword':'test', 'restaurantSiret':'111111111', 'restaurantWebsite':'www.test.com', 'phoneRestaurant':'0000000000', 'restaurantAdress':'1 rue test 75000 TEST', 'lnglat':"{}"})
        // .expect(200)
    expect(res.body.token).toBeDefined()
    token = res.body.token
    done()
});

describe('wishlist', () => {
    test('ajout wishlist', async(done)=>{
        let result = await request(app)
            .post('/restaurants/addToWishList')
            .send({'token': token, 'id':'5faa9c2489d757317d8d7ec4'})
            .expect(200)
        
        expect(result.body.restaurantwishlistid).toEqual(
            expect.arrayContaining(['5faa9c2489d757317d8d7ec4']),
        );
        done()
    })

    test('retrait wishlist', async(done)=>{
        let result = await request(app)
            .post('/restaurants/addToWishList')
            .send({'token': token, 'id':'5faa9c2489d757317d8d7ec4'})
            .expect(200)
        expect(result.body.restaurantwishlistid).toEqual([]);
        done()
    })
})


test('affichage liste restaurants', async(done)=>{
    let res = await request(app)
        .get('/restaurants/getinformation')
        .expect(200)
    expect(res.body.talentlist).toBeDefined()
    done()
})


test('cherche profil', async(done)=>{
    let result = await request(app)
        .get('/restaurants/profil/UVOEKrqPZK3qSunuTGbjj2ptoQdDrRz9')
        .expect(200)
    expect(result.body).toBeDefined()
    done()
})