import axios from 'axios'

const cards = document.querySelector('.cards')

//pulling my user data from the API and adding it to the DOM

axios.get('https://api.github.com/users/ajwpdx')
    .then(response => {
        cards.appendChild(cardMaker(response))
        console.log(response)
    })
    .catch( err => {
        console.log('error!')
    })


//array of followers
const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

//function to get followers from array
function getFollowers(array){
  array.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
  .then( response => {
    cards.appendChild(cardMaker(response))
    console.log(response.data)
})
.catch( err => {
    console.log('error!')
})
})}


// getFollowers(followersArray)


//stretch goal
function getFollowing(userName){
  axios.get(`https://api.github.com/users/${userName}/following`)
  .then(response => {
    let followingArray = response.data
    console.log(followingArray)
    followingArray.forEach(user => {
      axios.get(`https://api.github.com/users/${user.login}`)
      .then( response => {
        cards.appendChild(cardMaker(response))
        console.log(response.data)
    })
    .catch( err => {
        console.log('error!')
    })
    })

  }).catch( err => {
    console.log('mistake!')
  })

  console.log(followingArray)


}

getFollowing('ajwpdx')


//https://api.github.com/users/ajwpdx/following


//function to create new cards
function cardMaker (cardDataObj){

  //creating elements
  const card = document.createElement('div')
  const profileImage = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const userName = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const githubAddress = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')

  //assigning element attributes and content
  card.className = 'card'
  profileImage.setAttribute('src', cardDataObj.data.avatar_url)
  cardInfo.className = 'card-info'
  name.className = 'name'
  name.textContent = cardDataObj.data.name
  userName.className = 'username'
  userName.textContent = cardDataObj.data.login
  location.textContent = `Location: ${cardDataObj.data.location}`
  profile.textContent = `Profile: `
  githubAddress.textContent = cardDataObj.data.html_url
  githubAddress.setAttribute('href', cardDataObj.data.html_url)
  followers.textContent = `Followers: ${cardDataObj.data.followers}`
  following.textContent = `Following: ${cardDataObj.data.following}`
  bio.textContent = cardDataObj.data.bio


  //setting up structure
  card.appendChild(profileImage)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(userName)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)
  profile.appendChild(githubAddress)

  return card
}
