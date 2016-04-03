
var repo = {
    champions: [],
    championsListCached: false,
    
    getChampions: function(callback) {
        if (!repo.championsListCached) {
            // Old link: http://ddragon.leagueoflegends.com/cdn/6.5.1/data/en_US/champion.json
            
            // API link: https://developer.riotgames.com/api/methods#!/1055/3633
            $.get('https://na.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=b725dd4e-3669-4805-8e86-217f53183a2c', function(data) {
                repo.champions = data.data;
                callback(data.data);
                repo.championsListCached = true;
            });
        }
    },
    
    getArrayChampions: function(callback) {
        //only use when getChampions is already used
        if(repo.championsListCached) {
            callback(repo.champions);
        }
        else {
            console.log("error, repo.champions is not initialized and cached yet");
        }
    }
    
}

