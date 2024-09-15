document.getElementById("copy-shortened-url").addEventListener("click", (event) => {
    const shortenedURL = document.getElementById("shortened-url");

    shortenedURL.select();
    shortenedURL.setSelectionRange(0, 99999);
  
    navigator.clipboard.writeText(shortenedURL.value);

    event.target.innerText = 'Copiado';
});