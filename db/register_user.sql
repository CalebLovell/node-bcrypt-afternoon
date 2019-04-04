INSERT INTO users
(is_admin, username, hash)
VALUES
(${isAdmin}, ${username}, ${password})
returning *;

-- when done like this we must pass in an object on registeredUser from auth controller await