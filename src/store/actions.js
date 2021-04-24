// ACTION CREATOR FUNCTION
export const setJwt = (jwt) => ({
    type: 'SET_JWT',
    payload: jwt
});

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
})