const BASE_URL = "http://localhost:3030";

export async function doesUserExist(username) {
  return fetch(`${BASE_URL}/profile?name=${username}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("ERROR");
    })
    .then((data) => {
      if (data[0].name) {
        return true;
      }
    })
    .catch((error) => {
      return false;
    });
}

export async function registerUser(username, password) {
  const url = `${BASE_URL}/profile`;
  const data = {
    name: username,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERROR");
    }
  } catch (error) {
    console.error(`Problem with fetch. ERROR: ${error}`);
  }
}

export async function checkCredentials(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/profile?name=${username}`);
    if (response.ok) {
      const data = await response.json();
      if (data[0].name) {
        const user = data[0];
        if (user.password === password) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      throw new Error("Error checking user existence");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
    return false;
  }
}
