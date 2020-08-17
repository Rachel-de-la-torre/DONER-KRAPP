const mongoose = require("mongoose")

const Kebab = require("../models/kebab")
const User = require("../models/user")

mongoose.connect(process.env.MONGODB_URI||`mongodb://localhost/kebabDb`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Kebab.collection.drop()
//User.collection.drop()

const Users = [{}];

const Kebabs = [

  {
    shopName: "Greasy shot",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124127/Krapp/8_owjrmn.jpg",
    review: 1,
    address: "Otto-Schmirgal-Str. 1, 10319 Berlin",
    coord: [],
    comments: [{
      title: `NIE MALS`,
      body: 'Ich reduzier auf 11/2 Sterne..(3.9.2014) Typisch Döner Station halt. Man kann drinnen und draußen sitzen. Der Döner schmeckt recht gut. Drei Spielautomaten sind vorhanden. Durchaus eine Alternative zum Tierpark Bistro und McDonalds und auch Kaisers gibt es hier ja nicht mehr...',
      date: '03.09.14'
    }],
  },

  {
    shopName: "Horse glue",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124127/Krapp/5_cjhmqu.jpg",
    review: 1,
    address: "Friedrichstr. 101, 10117 Berlin",
    coord: [],
    comments: [{
      title: `Kotzen essen`,
      body: 'Der Laden betreibt offensichtlich Preisabsprachen. Unabhängig von der Qualität des Essen kann ich daher keine Punkte geben, da ein solches Verhalten wettbewerbswidrig ist.',
      date: '01.01.20'
    }],
  },

  {
    shopName: "Rat's paradise",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124127/Krapp/9_vculbq.jpg",
    review: 3,
    address: "Prenzlauer Allee 32, 10405 Berlin",
    coord: [],
    comments: [{
      title: `Es stinkt zu holle`,
      body: 'Einmal rein und rückwärts wieder raus, WAS FÜR EIN GRAUS! Es stinkt wirklich fürchterlich nach Rauch!',
      date: '05.21.19'
    }],
  },

  {
    shopName: "Rubber chew",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124127/Krapp/7_xcmdqc.jpg",
    review: 2,
    address: "Wilmersdorfer Str. 129, 10627 Berlin",
    coord: [],
    comments: [{
      title: `Sorry aber wie scheiße seid ihr?`,
      body: 'Essen dürfen wir nicht mehr bei euch aber verkaufen geht? Ganz klasse für einen zweitklassigen Döner - herzlichen Glückwunsch - nie wieder bei euch!!! Ps das Fleisch ist quasi ungenießbar - Qualität zahlt sich am Ende aus - versucht es mal damit wenn der Service schon versagt!',
      date: '11.15.18'
    }],
  },

  {
    shopName: "We also serve food",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124126/Krapp/1_llf08i.jpg",
    review: 1,
    address: "Pfarrstr. 116, 10317 Berlin",
    coord: [],
    comments: [{
      title: `4.50 EURO DÖNER???!!!`,
      body: 'Wird von Jahr zu Jahr teurer... also die Preise werden wirklich immer dreister und ich kenne Yuppies seit der Eröffnung. Das Essen ist halt billiges Fastfood vor allem die Chinapfanne: Finger weg! das lohnt sich es nicht für den Preis... überfettet, kaum Gemüse...',
      date: '11.06.19'
    }],
  },

  {
    shopName: "Bremsflüssigkeitd",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124126/Krapp/2_ont95n.jpg",
    review: 1,
    address: "An der Putlitzbrücke, 13353 Berlin",
    coord: [],
    comments: [{
      title: `Hundefutter`,
      body: 'Ok der Laden war jetzt nicht Mega voll aber das Angebot ist vielfältig . Preislich gesehen ist aber ein Döner mit Doppelfleisch für 5 Euro schön heftig das muss ich einfach sagen ....',
      date: '10.16.19'
    }],
  },

  {
    shopName: "Skidmark",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124126/Krapp/3_nfrvzq.jpg",
    review: 1,
    address: "Rudolstädter Str. 93, 10713 Berlin",
    coord: [],
    comments: [{
      title: `schrecklich`,
      body: 'Kein stern. Hab 2 malvon dort döner gekauft und beides weg geschmissen leider. Bedienung sehr freundlich aber... Naja geschmackssache',
      date: '09.11.19'
    }],
  },

  {
    shopName: "Beefmä́ßig",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124126/Krapp/4_qztji2.jpg",
    review: 2,
    address: "Tauentzienstraße 21-24, 10789 Berlin",
    coord: [],
    comments: [{
      title: `Nie wieder`,
      body: 'Schade. Von außen sieht das Bistro gar nicht so schlecht aus, es gibt sogar ein paar Tische und Stühle vor dem Laden. Der Döner ist mit 3,80€ aber viel zu teuer für das, was geboten wird. Billiges Brot, wenig Salat, keine besonders guten Soßen. Der Döner schmeckte nach nicht viel.',
      date: '01.02.19'
    }],
  },

  {
    shopName: "Geschmacksverstärker",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124126/Krapp/6_lm2bfr.jpg",
    review: 1,
    address: "Hasenheide 54, 10967 Berlin",
    coord: [],
    comments: [{
      title: `abstoßend`,
      body: 'dunklen Ecken das Restaurant. Hackfleisch-Grau-Dönerspieß, trostlose. Salatauslagen am der Theke, 2 angetrocknete gefüllte Auberginen und der Hähnchengrill',
      date: '09.08.17'
    }],
  },

  {
    shopName: "Immodium",
    picture: "https://res.cloudinary.com/dpqkayvki/image/upload/v1594124126/Krapp/0_tustb5.jpg",
    review: 2,
    address: "Tamara-Danz-Straße 11, 10243 Berlin",
    coord: [],
    comments: [{
      title: `war es essbar?`,
      body: 'habe 2x dort gegessen und 2x durchfall bekommen ausserdem ist das fleisch das billigste und der salat sieht ziemlich labrig aus. Dazu stehen da noch 2 geldspielautomatrn da kommt man sich wie in einem casino vor',
      date: '11.12.19'
    }],
  },

]

/* User
  .create(Users)
  .then(allUsers => {
    console.log(`User is added`)
    mongoose.connection.close()
  })
  .catch(error => {
    throw new Error(`User is not added. ${error}`)
  })
 */
Kebab
  .create(Kebabs)
  .then(allKebabs => {
    console.log(`Kebab Shop is added`)
    mongoose.connection.close()
  })
  .catch(error => {
    throw new Error(`Kebab shop is not added. ${error}`)
  })