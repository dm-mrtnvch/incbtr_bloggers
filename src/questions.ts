//*********** return ***********
// return's usage when sending response



// *********** response usage ***********
// res.send() - uses content-type:text/html

// res.json() - content-type:application/json


// res.status() - sets a HTTP status on the response
//                (as a Javascript object on the server side).

// res.sendStatus ~= - res.send + res.status
//                   - doesn't have response body
//                   - sets the status and sends it to the client.



//*********** value's return ***********
// getPostById...
// 1) return post

// 2) return post ? post : false

// 3) if (post) {
//             return post
//         } else {
//             return false
//         }
