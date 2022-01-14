$(() => {
  setInterval("autoRefreshPage()", 3000);
});

function autoRefreshPage() {
    window.location = window.location.href;
}