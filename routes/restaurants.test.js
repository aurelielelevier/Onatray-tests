var app = require('../app');
var request = require('supertest');
var restaurantModel = require('../model/restaurants');
jest.setTimeout(30000);

let token ='' 

test('create account', async(done)=>{
    let res = await request(app)
        .post('/restaurants/createAccount')
        .send({'restaurantEmail':'test@test.fr', 'restaurantPassword':'test', 'restaurantName':'RESTO TEST', 'restaurantSiret':'111111111', 'restaurantWebsite':'www.test.com', 'phoneRestaurant':'0000000000', 'restaurantAdress':'1 rue test 75000 TEST', 'lnglat':"{}"})
        .expect(200)
    expect(res.body.token).toBeDefined()
    token = res.body.token
    done()
});

describe('wishlist', () => {
    test('ajout wishlist', async(done)=>{
        let result = await request(app)
            .post('/restaurants/addToWishList')
            .send({'token': token, 'id':'5fbd173a05d743a964126192'})
            .expect(200)
        
        expect(result.body.restaurantwishlistid).toEqual(
            expect.arrayContaining(['5fbd173a05d743a964126192']),
        );
        done()
    })

    test('retrait wishlist', async(done)=>{
        let result = await request(app)
            .post('/restaurants/addToWishList')
            .send({'token': token, 'id':'5fbd173a05d743a964126192'})
            .expect(200)
        expect(result.body.restaurantwishlistid).toEqual([]);
        done()
    })
})


test('affichage liste talents', async(done)=>{
    let res = await request(app)
        .get('/restaurants/getinformation')
        .expect(200)
    expect(res.body.talentlist).toBeDefined()
    done()
})

test('mise a jour profil', async(done)=>{
    let clientele = JSON.stringify(['touristique'])
    let restaurantOption = JSON.stringify(['calme'])
    let foodOption = JSON.stringify(['pizza'])
   
    let result = await request(app)
        .put(`/restaurants/informations`)
        .send({'token':token, 'clientele':clientele, 'restaurantOption':restaurantOption, 'foodOption':foodOption, 'pricing':0 })
        .expect(200)
    expect(result.body.name).toStrictEqual('RESTO TEST')
    expect(result.body.typeOfRestaurant).toEqual(expect.arrayContaining(['calme']))
    expect(result.body.clientele).toEqual(expect.arrayContaining(['touristique']))
    expect(result.body.typeOfFood).toEqual(expect.arrayContaining(['pizza']))
    expect(result.body.pricing).toStrictEqual(0)
    done()
})

test('cherche profil', async(done)=>{
    let result = await request(app)
        .get(`/restaurants/profil/${token}`)
        .expect(200)
    expect(result.body.name).toStrictEqual('RESTO TEST')
    done()
})

afterAll(async()=>{
    await restaurantModel.deleteOne({token:token})
})