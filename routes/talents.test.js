var app = require('../app');
var request = require('supertest');
var talentModel = require('../model/talents')
jest.setTimeout(30000);

let token ='' 

test('create account', async(done)=>{
    let res = await request(app)
        .post('/talents/createAccount')
        .send({'firstName':'test', 'lastName':'TEST', 'email':'a@a.test', 'password':'password', 'phone':'0000000000'})
        .expect(200)
    expect(res.body.token).toBeDefined()
    token = res.body.token
    done()
});

describe('wishlist', () => {
    test('ajout wishlist', async(done)=>{
        let result = await request(app)
            .post('/talents/whishlist')
            .send({'token': token, 'restaurant':'5fbd173a0fd15aa965c83c94'})
            .expect(200)
        
        expect(result.body.whishlist).toEqual(expect.arrayContaining(['5fbd173a0fd15aa965c83c94']),
        );
        done()
    })

    test('retrait wishlist', async(done)=>{
        let result = await request(app)
            .post('/talents/whishlist')
            .send({'token': token, 'restaurant':'5fbd173a0fd15aa965c83c94'})
            .expect(200)
        expect(result.body.whishlist).toEqual([]);
        done()
    })
});

test('ajoute informations', async(done)=>{
    const formation = JSON.stringify([{school:'a', diploma:'a', year:'2000', city:'aaaa'}])
    const langage = JSON.stringify(['espagnol'])
    const experience = JSON.stringify([{firm:'a', rangeDate:['01/01/2018','30/10/2020'], city:'aaaa', job:'cuisinier'}])
    let res = await request(app)
        .post('/talents/informations')
        .send({'token':token, 'job':'[]', 'langage':langage, 'contrat':['CDI'], 'recherche':true, 'formation':formation, 'experience':experience, 'poste':true })
        .expect(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.formation).toHaveLength(1)
    expect(res.body.experience).toHaveLength(1)
    expect(res.body.lookingJob).toBeTruthy()
    expect(res.body.working).toBeTruthy()
    expect(res.body.speakLangage).toEqual(expect.arrayContaining(['espagnol']))
    expect(res.body.typeofContract).toEqual(expect.arrayContaining(['CDI']))
    done()
});


test('envoi secteur', async(done)=>{
    let liste = JSON.stringify([[0,1], [2,3]])
    let result = await request(app)
        .post('/talents/envoi-secteur')
        .send({'token': token, 'liste':liste})
        .expect(200)
    expect(result.body).toBeDefined()
    expect(result.body.perimetre).toEqual(expect.arrayContaining([[0,1], [2,3], [0,1]]))
    expect(result.body.polygone.coordinates).toEqual(expect.arrayContaining([[[0,1], [2,3], [0,1]]]))
    done()
})

test('envoi adresse', async(done)=>{
    let lnglat = JSON.stringify({type:'point', coordinates:[2.33, 48.5]})
    let result = await request(app)
        .post('/talents/envoi-adresse')
        .send({'token': token, 'adresse':'12 RUE DE PARIS 75000 PARIS', 'lnglat':lnglat})
        .expect(200)
    expect(result.body.adress).toBeDefined()
    expect(result.body.adresselgtlat).toBeDefined()
    done()
})

test('affichage liste restaurants', async(done)=>{
    let restaurant = {cuisine:['pizza'], ambiance : ['calme'], type : ['touristique'] , prix:[0, 1, 2], zone:[
        [ -5.3173828125, 48.458124202908934 ],
        [ 2.1313476562500004, 51.26170001449684 ],
        [ 8.811035156250002, 48.90783374365477 ],
        [ 7.998046875000001, 43.70709714273101 ],
        [ 3.2080078125000004, 42.228008913641865 ],
        [ 1.4941406250000002, 42.293056273848215 ],
        [ -2.0214843750000004, 43.06838615478111 ],
        [ -5.3173828125, 48.458124202908934 ]
      ]}
    let result = await request(app)
        .post('/talents/recherche-liste-restaurants')
        .send({'token': token, 'restaurant':JSON.stringify(restaurant)})
        .expect(200)
    expect(result.body.whishlist).toBeDefined()
    expect(result.body.liste).toBeDefined()
    done()
})

test('détail restaurant', async(done)=>{
    let result = await request(app)
        .get('/talents/detail-restaurant/5fbd173a0fd15aa965c83c94')
        .expect(200)
    expect(result.body.name).toStrictEqual('RESTO TEST')
    done()
})

test('détail profil', async(done)=>{
    let talent = await request(app)
        .get(`/talents/profil/${token}`)
        .expect(200)
    expect(talent.body.working).toBeTruthy()
    expect(talent.body.token).toStrictEqual(token)
    done()
})


afterAll(async()=>{
    await talentModel.deleteOne({token:token})
})