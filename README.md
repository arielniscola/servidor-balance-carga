# servidor-balance-carga

#Server modo cluster

modo de ejecución: pm2 start server.js -- -- 8081 cluster

ver procesos windows: tasklist /fi "imagename eq node.exe"


![image](https://user-images.githubusercontent.com/41024148/189000917-7c484f44-6fa7-499e-872e-3c82a300c7a9.png)


#Server modo fork

pm2 start server.js -- -- 8081 fork (si no se le pasa modo Fork por defecto)

![image](https://user-images.githubusercontent.com/41024148/189001480-35b9bc8e-229e-4752-bb0d-e063fe9ead43.png)
