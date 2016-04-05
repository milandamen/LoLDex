//bind events
$('.sure-do').click(function(event) {
    resetUnlockedChampions();
    app.parseUnlockedChampions();
});