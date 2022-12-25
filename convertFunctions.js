function idToShortURL(n) 
{
    let map = "abcdefghijklmnopqrstuvwxyzABCDEF"
    "GHIJKLMNOPQRSTUVWXYZ0123456789";
    let shorturl = [];
    while (n) 
    {
        shorturl.push(map[n % 62]);
        n = Math.floor(n / 62);
    }
    shorturl.reverse();
    return shorturl.join("");
}
  
function shortURLtoID(shortURL) {
    let id = 0;
    for (let i = 0; i < shortURL.length; i++) {
        if ('a' <= shortURL[i] && shortURL[i] <= 'z')
            id = id * 62 + shortURL[i].charCodeAt(0) - 'a'.charCodeAt(0);
        if ('A' <= shortURL[i] && shortURL[i] <= 'Z')
            id = id * 62 + shortURL[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
        if ('0' <= shortURL[i] && shortURL[i] <= '9')
            id = id * 62 + shortURL[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
    }
    return id;
}

module.exports = { idToShortURL, shortURLtoID}