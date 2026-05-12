# Ludoteca - Frontend (Cambios extra)

## Rama: Cambios en esta rama

Esta rama contiene aquellos cambios que he hecho y que interfieren con los requisitos de la aplicación pero que creo que mejoran la misma.

### 1. Sistema de Redirección en lugar de Diálogos de Error

En los requisitos se nos pide que si no se puede eliminar una entidad debido a sus dependencias con otra se muestre un dialogo de error. En esta rama he decidido directamente omitir el boton de eliminar en aquellos casos en los que no se pueda, cambiandolo por un boton de redirección que te lleva a la dependencia filtrada según la entidad seleccionada. (Esto ha hecho que tenga que añadir un tercer filtro en la listra de juegos, el de autores)

### 2. Eliminar boton de filtro

En el tutorial se pide que las listas filtradas cuenten con un botón para filtral los resultados y otro para eliminar los filtros. He decidido eliminar este boton de filtro ya que me resultaba muy antintuitivo, llevando a cabo el filtrado en su lugar tras presionar enter o en el blur del filtro.

### 3. Índices en lugar de IDs en Tablas

El último cambio que interfiere con los requisitos es un cambio menor, y es que se nos pide usar el id de cada elemnto en el listado que corresponda. Sin embargo mostrar el id a los usuarios no aporta beneficio y al ser un id autoincremental parece una numeración, sin embargo al borrar un elemento se produce un salto de un número a otro que puede confundir al usuario. Por ello he decidido mantener este campo pero mostrando el indice de los elemntos que se muestran en pantalla.