axios
  .get("https://api.github.com/users/1sdc0d3r")
  .then(function(res) {
    console.log(res);
    cardCreator(res.data);
    // followersArray.push(res.data);
    // console.log(followersArray);
  })
  .catch(err => console.log(err));

const entryPoint = document.querySelector(".cards");

function cardCreator(data) {
  // console.log(data);
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = data.avatar_url;
  // img.setAttribute("src", data.avatar_url);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = data.name;

  const username = document.createElement("p");
  username.classList.add("username");
  username.textContent = data.login;

  const location = document.createElement("p");
  if (data.location === null) {
    location.textContent = `Location: Not Specified`;
  } else {
    location.textContent = `Location: ${data.location}`;
  }

  const profile = document.createElement("p");
  profile.textContent = "Profile: ";

  const profileLink = document.createElement("a");
  profileLink.href = data.html_url;
  profileLink.textContent = data.html_url;

  const followers = document.createElement("p");
  if (data.followers === 0) {
    followers.textContent = `Followers: No Friends :_(`;
  } else {
    followers.textContent = `Followers: ${data.followers}`;
  }

  const following = document.createElement("p");
  if (data.following === 0) {
    following.textContent = `Following: Lone Wolf`;
  } else {
    following.textContent = `Following: ${data.following}`;
  }

  const bio = document.createElement("p");
  if (data.bio === null) {
    `Bio: Not Included`;
  } else {
    `Bio: ${data.bio}`;
  }

  card.append(img, cardInfo);
  cardInfo.append(name, username, location, profile, followers, following, bio);
  profile.append(profileLink);
  entryPoint.append(card);
  // return card;
}

let followersArray = [];
// let cardArray = [];

// axios
//   .get("https://api.github.com/users/1sdc0d3r/followers")
//   .then(function(res) {
//     console.log(res);
//     res.data.forEach(function(e) {
//       axios
//         .get(e.url)
//         .then(res => {
//           // console.log(res);
//           cardCreator(res.data);
//         })
//         .catch(err => console.log(err));
//     });
//   })
//   .catch(err => console.log(err));

axios
  .get("https://api.github.com/users/1sdc0d3r/followers")
  .then(function(res) {
    console.log(res);
    res.data.forEach(function(e) {
      followersArray.push(e.login);
    });
  })
  .then(function(res) {
    console.log(followersArray);
    followersArray.forEach(function(e) {
      axios
        .get(`https://api.github.com/users/${e}`)
        .then(res => {
          console.log(res);
          cardCreator(res.data);
        })
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.log(err));
