function catChange(catItem){ /*Funcion que determina el div que se clickea en catalogo para mostrar informacion especifica de cada uno*/
    let text = document.getElementById('catText')
    switch(catItem.id){ /*Uso de switch case para modificar texto a la vez que se clickea otro elemento del DOM*/
        case 'cat1':/*Al hacer uso de innerHTML modificamos la estructura del HTML para poder insertar etiquetas especificadas en la cadena de texto despues del =*/
            text.innerHTML = `<h2>Escritorios</h2><br><h3>Todos nuestros escritorios 
            están hechos a medida, esto proporciona mayor comodidad en tu espacio personal.
            Tu idea se materializa sin importar tamaño, color, funciones, etc.</h3><br>
            <a href='./contacto.html'> Contáctanos para mayor información</a>`
        break
        case 'cat2':/*Al hacer uso de innerHTML modificamos la estructura del HTML para poder insertar etiquetas especificadas en la cadena de texto despues del =*/
            text.innerHTML = `<h2>Recámaras</h2><br><h3>Crea tu espacio íntimo a tu medida, desde un estilo 
            asiatico y minimalista, hasta un área sacada de pelicula antigüa</h3><br>
            <a href='./contacto.html'> Contáctanos para mayor información</a>`
        break
        case 'cat3':/*Al hacer uso de innerHTML modificamos la estructura del HTML para poder insertar etiquetas especificadas en la cadena de texto despues del =*/
            text.innerHTML = `<h2>Cocinas</h2><br><h3>Te imaginas un hogar sin cocina? Pues 
            nosotros tampoco!<br>Te mereces un espacio tranquilo para consentirte y a los que te 
            rodean</h3><br>
            <a href='./contacto.html'> Contáctanos para mayor información</a>`
        break
        case 'cat4':/*Al hacer uso de innerHTML modificamos la estructura del HTML para poder insertar etiquetas especificadas en la cadena de texto despues del =*/
            text.innerHTML = `<h2>Salas</h2><br><h3>Cada sala cuenta una historia diferente, 
            es por eso que el confort y diseño son parte crucial de cualquier área común.</h3><br>
            <a href='./contacto.html'> Contáctanos para mayor información</a>`
        break
        case 'cat5':/*Al hacer uso de innerHTML modificamos la estructura del HTML para poder insertar etiquetas especificadas en la cadena de texto despues del =*/
            text.innerHTML = `<h2>Comedores</h2><br><h3>Así como hemos visto espacios cruciales en 
            cualquier hogar, el comedor será el lugar donde se desenvuelven las mejores pláticas.</h3><br>
            <a href='./contacto.html'> Contáctanos para mayor información</a>`
        break
    }
}