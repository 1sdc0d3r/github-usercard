// import axios from "axios";
axios
  .get("https://api.github.com/users/1sdc0d3r")
  .then(res => console.log(res))
  .catch(err => console.log(err));
