<!-- # SIM -->
# Practico Final Simulacion UTN-FRC

## Enunciado Ejercicio 20

Una empresa desea probar políticas de cantidad de pedido y de punto de renovación de pedido
del inventario del único artículo que vende. La distribución de frecuencias relativas para la
demanda diaria es la que se detalla en la tabla siguiente:


Demanda Diaria|Probabilidad
-|-
0|0.05
1|0.20
2|0.40
3|0.15
4|0.10
5|0.05
6|0.05

El producto es provisto por un distribuidor que no garantiza tener stock disponible cuando la
empresa realiza el pedido, por tal motivo se ha llevado un historial de las entregas y el tiempo
de aprovisionamiento de las mismas:

Plazo de en días|Probabilidad
-|-
0|0,10
1|0,20
2|0,30
3|0,30
4|0,05
5|0,05

Los costos asociados con el manejo del inventario son:
 * El costo de tenencia del inventario (almacenamiento) de $ 12 por unidad por día.
 * El costo de los pedidos de $ 220.
 * El costo de los agotamientos de $60 por unidad y debe ser considerado al finalizar
el séptimo día a partir del que se produjo el agotamiento.

El inventario inicial es de 12 unidades. La empresa y el proveedor trabajan los 7 días a la
semana.

1. Simular 16 semanas de operación para la empresa teniendo en cuenta que se piden 20
unidades por semana y el primer lote se pide en el primer día.

2. Considere una nueva política que consiste en realizar pedidos en lotes de 15 unidades
pero cuando el stock llegue a 5 unidades o menos.

## Desarrollo

Este proyecto fue desarrollado usando [MDB](https://mdbootstrap.com/angular) para Angular.

Para desplegar este proyecto se debe tener [Angular](https://angular.io/guide/quickstart) instalado.

### Compilacion y Ejecucion

Ejecutar el comando `ng serve` en la carpeta del proyecto.

Navegar a la dirección `http://localhost:4200/`.

La aplicacion deberá estar iniciada y lista para ser usada.