const characterService = require('../services/character')
const movieService = require('../services/movie')

module.exports = async () => {
  const newCharacters = [
    {
      name: 'Cenicienta',
      imageUrl: 'https://static.wikia.nocookie.net/disney-spanish/images/f/f3/Clipart_grande_taille2.png/revision/latest?cb=20130512192334&path-prefix=es',
      age: 19,
      weight: 50.2,
      history: 'Una princesa de Disney',
      movies: [
        'Cenicienta'
      ]
    },
    {
      name: 'Bella',
      imageUrl: 'https://w7.pngwing.com/pngs/549/630/png-transparent-belle-ariel-beast-rapunzel-tiana-disney-princess-disney-princess-cartoon-beast-thumbnail.png',
      age: 24,
      weight: 45.2,
      history: 'Una princesa de Disney',
      movies: [
        'La Bella y la Bestia'
      ]
    },
    {
      name: 'Bestia',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Disney-beast.PNG/220px-Disney-beast.PNG',
      age: 42,
      weight: 150.2,
      history: 'Una bestia de Disney',
      movies: [
        'La Bella y la Bestia'
      ]
    },
    {
      name: 'Dumbo',
      imageUrl: 'https://w7.pngwing.com/pngs/466/203/png-transparent-disney-dumbo-the-walt-disney-company-film-dumbo-storybook-dumbo-the-walt-disney-company-film-clip-thumbnail.png',
      age: 5,
      weight: 200.2,
      history: 'Un elefante de Disney',
      movies: [
        'Dumbo'
      ]
    },
    {
      name: 'Spider-Man',
      imageUrl: 'https://static.wikia.nocookie.net/disney/images/9/9d/SM-FFH-New-Suit.png/revision/latest?cb=20190718150658&path-prefix=es',
      age: 23,
      weight: 70.2,
      history: 'Un superheroe de Disney',
      movies: [
        'Spider-Man',
        'Spider-Man 2'
      ]
    }
  ]

  const movies = [
    {
      name: 'Cenicienta',
      imageUrl: 'https://m.media-amazon.com/images/I/51XK-yYR44L._AC_.jpg',
      createDate: '1968-01-01',
      rating: 5,
      genre: { name: 'animated' }
    },
    {
      name: 'La Bella y La Bestia',
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTElzmBGsunDzKgtNBL7DcpwzCGvuqZJZSvzH3FY-nPt9TsgoC',
      createDate: '2017-01-01',
      rating: 4,
      genre: { name: 'live-action' }
    },
    {
      name: 'Dumbo',
      imageUrl: 'https://m.media-amazon.com/images/I/71GtUHw4u8L._AC_SY679_.jpg',
      createDate: '1941-01-01',
      rating: 5,
      genre: { name: 'animated' }
    },
    {
      name: 'Spider-Man',
      imageUrl: 'https://m.media-amazon.com/images/I/71hvoqd-X3L._AC_SL1357_.jpg',
      createDate: '2002-01-01',
      rating: 3,
      genre: { name: 'live-action' }
    },
    {
      name: 'Spider-Man 2',
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQy6KUcWyJB0yL6-ML2qojIbh-N3MqeMywbWZlDGW7FbwK4lsLx',
      createDate: '2004-01-01',
      rating: 4,
      genre: { name: 'live-action' }
    }
  ]


  for (const movie of movies) {
    await movieService.create(movie)
  }


  for (const character of newCharacters) {
    await characterService.create(character)
  }


}