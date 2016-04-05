if(localStorage.getItem('checked') === "true") {
    document.getElementById('checkbox-1a').checked = true;
    app.show(true);
}
else {
    document.getElementById('checkbox-1a').checked = false;
    app.show(false);
}

//bindCustomEvents
$('#checkbox-1a').click(function() {
    if(document.getElementById('checkbox-1a').checked) {
        localStorage.setItem('checked', 'true');
        app.show(true);
    }
    else {
        localStorage.setItem('checked', 'false');
        app.show(false);
    }
});