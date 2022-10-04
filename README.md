## *MD-LINKS by Sonia Reyes*

"*md-links*" es un módulo que te ayudará a verificar links de archivos .md, y validar si funcionan o están rotos. 

### ¿Donde lo encuentro?
Puedes ver la documentación oficial de este paquete en NPM:
[@soniarez/md-links](https://www.npmjs.com/package/@soniarez/md-links)

### ¿Cómo instalarlo?
Debes abrir la terminal desde la carpeta del proyecto donde quieres instalarlo. Otra forma, es hacerlo en la carpeta del proyecto desde la terminal con los comandos necesarios (ejemplo: cd,ls, etc.)

### Nivel local

npm i @soniarez/md-links

### Nivel global

npm install @soniarez/md-links -g


### ¿Cómo funciona?
Al ejecutar *md-links* en la terminal, acompañado de la ruta que deseas evaluar, te devuelverá una promesa con un resultado que corresponde a un arreglo de objetos.

### Valor de retorno:

  - href: URL encontrada.
  - text: Texto que aparecería dentro del link <a>
  - file: Ruta del archivo donde se encontró el link.

### --validate (como argumento)

Si incluyes el argumento *--validate*, te entregará lo siguiente:

  - href: URL encontrada.
  - text: Texto que aparecía dentro del link (<a>).
  - file: Ruta del archivo donde se encontró el link.
  - status: Código de respuesta HTTP.
  - statusText: Mensaje Not found en caso de fallo u ok en caso de éxito.

### --stats (como argumento)

Si pasas la opción *--stats* el output (salida) será un texto con estadísticas básicas sobre los links.

  - total: número de links en el archivo evaluado.
  - unique: número de links únicos (no repetidos).

### Ejemplo de uso en terminal

Escribe en la terminal:

md-links [ruta del archivo a evaluar] --validate

Y mostrará algo así:
```
[ { 
    href:  "https://es.wikipedia.org/wiki/Markdown",

    text: Markdown,
    file: https://es.wikipedia.org/wiki/Markdown
    status: 200
    statusText: Ok }
  { href: 'https://developers.google.com/v8/',
  
    text: Motor de JavaScript V8 de Chrome,
    file: https://v8.dev/xxxxxx
    status: 404
    statusText: Not found }]
```

Con --stats:
```
md-links [ruta del archivo a evaluar] --stats
Total: 3
Unique: 3
```

## Demo
![md-links-gif](https://user-images.githubusercontent.com/101676781/193935826-1e2ee368-91e5-4c96-b7e7-1fce5cc9328a.gif)
