//reset champions unlocked
function resetUnlockedChampions() {
    console.log('remove unlocked champions');
    localStorage.removeItem('unlockedChampions'); //once, testing purposes
    alert('Removed unlocked champions.');
}
// resetUnlockedChampions(); //comment / uncomment

//variables
var championName;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // app.bindCustomEvents();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        repo.getChampions(app.parseChampions);
        app.parseUnlockedChampions(getUnlockedChampions());
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    
    /**************************************/
    /*************** Custom ***************/
    /**************************************/
    
    /*** Custom properties ***/
    
    
    
    /*** Custom methods ***/
    
    /**
     * Binding custom events to page elements
     */
    bindCustomEvents: function() {
        $(document).on("pagebeforeshow", function() {
            if(championName) {
                $('.champName').html(championName);
                $('#champImage').html('<img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+championName+'_0.jpg" alt="'+championName+'"/>');
                
                //championName -> NULL
                championName = null;
            }
        });
        
        $('.championIcon').click(function(event) {
             championName = $(this).attr('id');
        });
    },
    
    parseChampions: function(data) {
        var champList = $('#champlist');
        var champions = Object.keys(data).sort();
        champions.forEach(function(champion) {
            champList.append('<a href="champion.html" id="'+champion+'" class="championIcon" data-transition="slide"><img src="img/champions/' + champion + '.png" alt="' + champion + '" onerror="app.loadAltImage(this)" /></a>');
        });
        app.bindCustomEvents();
    },
    
    parseUnlockedChampions: function(array) {
        var unlockedList = $('#unlockedlist');
        unlockedList.html(''); //reset / empty
        
        for(var i = 0; i < array.length; i++) {
            unlockedList.append('<a href="champion.html" id="'+array[i]+'" class="championIcon" data-transition="slide"><img src="img/champions/' + array[i] + '.png" alt="' + array[i] + '" onerror="app.loadAltImage(this)" /></a>');
        }
        
        app.bindCustomEvents();
    },
    
    loadAltImage: function(el) {
        el.src = 'http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/' + el.alt + '.png';
    },
    
    show: function(show) {
        if(show === true) {
            $('div.result').show();
        }
        else {
            $('div.result').hide();
        }
    }
};

//shake + unlock champion code
var amountSteps;
var unlockAmountShakes; //This seems good amount
initShakeVariables();

function initShakeVariables() {
    amountSteps = 0;
    
    //production
    unlockAmountShakes = randomIntFromInterval(3, 8); 
    
    //testing
    // unlockAmountShakes = 1; 
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    shake.startWatch(onShake);
    var str = 'Shakes: ' + amountSteps;
    $('div.result').html(str);
}

var onShake = function () {
    // Fired when a shake is detected
    amountSteps++;
    
    if(amountSteps >= unlockAmountShakes) {
        // for (i = 0; i < 10; i++) { 
        //     repo.getArrayChampions(returnRandomChamp);
        // }
        repo.getArrayChampions(returnRandomChamp);
        initShakeVariables();
    }
     
    var str = "Shakes: " + amountSteps;
    $('div.result').html(str);
    
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getFilteredChampionList(allChampions) {
    var championsUnlocked = getUnlockedChampions();
    var filteredChampionsList = allChampions.filter(function(val) {
       return championsUnlocked.indexOf(val) == -1; 
    });
    
    
    return filteredChampionsList;
}

function getUnlockedChampions() { //
    var championsUnlockJSON = localStorage.getItem('unlockedChampions');
    var championsUnlocked;
     
    if(!championsUnlockJSON) { //aka NULL
        championsUnlocked = [];
    }
    else {
        championsUnlocked = JSON.parse(championsUnlockJSON); 
    }
    
    championsUnlocked = championsUnlocked.sort();
    return championsUnlocked;
}

function returnRandomChamp(champions) {
    var championsArray = [];
    
    var championsList = Object.keys(champions).sort();
    championsList.forEach(function(champion) {
        championsArray.push(champion);
    });
    
    var filteredChampionsList = getFilteredChampionList(championsList);
    
    var randomChamp = filteredChampionsList[Math.floor(Math.random()*filteredChampionsList.length)];
    if(randomChamp) {
        $.mobile.changePage('#dialog', {transition: 'pop', role: 'dialog'});   
        $("#champIcon").html('<img src="img/champions/' + randomChamp + '.png" alt="' + randomChamp + '" onerror="app.loadAltImage(this)" />');
        $("#champUnlocked").html('<p>'+randomChamp+'</p>');
        
        
        var championsUnlocked = getUnlockedChampions();
        
        championsUnlocked.push(randomChamp);
        localStorage.setItem('unlockedChampions', JSON.stringify(championsUnlocked));
        
        //importante, update the champions list
        app.parseUnlockedChampions(championsUnlocked.sort());
    }
    else {
        alert('No more champions to unlock.');
    }
    
    navigator.vibrate(500); //500ms vibrate
}



//show loading modal when busy with an Ajax request, such as loading Champions
$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading"); },
    ajaxStop: function() { $body.removeClass("loading"); }    
});