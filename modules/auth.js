/**
 * Mijn middelware voor role based authentication
 * Passport heeft zelf middelware om dit op te lossen.
 * Het is netter om de middelware van passport te gebruiken!
 * Dit is dus puur een voorbeeld voor middelware en een zelf geschreven module
 */

//Ik exporteer een functie zodat ik de parameter 'role' mee kan geven
module.exports = function(role){

    //deze module geeft een middelware functie terug die gebruik maakt van de eerder meegegeven role
    return function(req, res, next){
        if(!req.user)
            res.send(401);
        else if(!role || req.user.isInRole(role))
            next(); //ga alleen door als de gebruiker de meegegeven rol heeft
        else{
            res.send(403);
        }   
    }  
}


