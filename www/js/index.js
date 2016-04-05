/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
                console.log("inside");
                
                $('.champName').html(championName);
                $('#champImage').html('<img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+championName+'_0.jpg" alt="'+championName+'"/>');
                
                //championName -> NULL
                championName = null;
            }
        });
        
        $('.championIcon').click(function(event) {
             championName = $(this).attr('id');
             console.log(championName);
        });
    },
    
    
    
    parseChampions: function(data) {
        // console.log(data);
        
        var champList = $('#champlist');
        var champions = Object.keys(data).sort();
        champions.forEach(function(champion) {
            // champList.append('<img src="img/champions/' + champion + '.png" alt="' + champion + '" onerror="app.loadAltImage(this)" />');
            champList.append('<a href="champion.html" id="'+champion+'" class="championIcon" data-transition="slide"><img src="img/champions/' + champion + '.png" alt="' + champion + '" onerror="app.loadAltImage(this)" /></a>');
        });
        app.bindCustomEvents();
    },
    
    loadAltImage: function(el) {
        el.src = 'http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/' + el.alt + '.png';
    }
    
    
};

//shake + unlock champion code
var amountSteps = 0;
// var unlockAmountShakes = randomIntFromInterval(3, 8); //This seems good amount
var unlockAmountShakes = 1; //easier for testing

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
        repo.getArrayChampions(returnRandomChamp);
        amountSteps = 0;
        
        //unlock champion and save it on the api database stuff
    }
     
    var str = "Shake amount for testing: " + amountSteps;
    $('div.result').html(str);
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function returnRandomChamp(champions) {
    var championsArray = [];
    
    var championsList = Object.keys(champions).sort();
    championsList.forEach(function(champion) {
        championsArray.push(champion);
    });
    
    var randomChamp = championsArray[Math.floor(Math.random()*championsArray.length)];
    
    $.mobile.changePage('#dialog', {transition: 'pop', role: 'dialog'});   
    $("#champIcon").html('<img src="img/champions/' + randomChamp + '.png" alt="' + randomChamp + '" onerror="app.loadAltImage(this)" />');
    $("#champUnlocked").html('<p>'+randomChamp+'</p>');
}


//show loading modal when busy with an Ajax request, such as loading Champions
$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading"); },
    ajaxStop: function() { $body.removeClass("loading"); }    
});