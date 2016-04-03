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
        app.bindCustomEvents();
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
        // $('#page-list').on('pageshow', function(event) {
        //     repo.getChampions(app.parseChampions);
        // });
    },
    
    parseChampions: function(data) {
        console.log(data);
        
        var champList = $('#champlist');
        var champions = Object.keys(data).sort();
        champions.forEach(function(champion) {
            champList.append('<img src="img/champions/' + champion + '.png" alt="' + champion + '" onerror="app.loadAltImage(this)" />');
        });
    },
    
    loadAltImage: function(el) {
        el.src = 'http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/' + el.alt + '.png';
    }
    
    
};

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});


//SHAKE DAT *ehhum*
var amountSteps = 0;
// var unlockAmountShakes = randomIntFromInterval(3, 8); //This seems good amounta
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
    // var championsArray = champions;
    // var championsArray = ["Ahri", "Annie", "Tibbers"];
    var championsArray = [];
    
    // return championsArray.toString();
    
    
    
    var championsList = Object.keys(champions).sort();
    championsList.forEach(function(champion) {
        championsArray.push(champion);
    });
    // console.log(championsArray);
    
    var randomChamp = championsArray[Math.floor(Math.random()*championsArray.length)];
    // var randomChamp = "RAWR";
    console.log(randomChamp);
    
    alert(randomChamp);
}