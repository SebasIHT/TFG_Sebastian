document.getElementById('contact-form').addEventListener('submit', function(event){
    event.preventDefault();

    const form = this;
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            alert('Formulario enviado');
            form.reset();
        } else {
            alert('Error al enviar el formulario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sucedio un error al enviar el formulario');
    });
});