# Hospital PoC
##### Add doctor and patient details

> Build dependency 

#### **Install Node (min version: 8.9.0)**
```
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo npm install -g n
sudo n 8.9.0
```
> Install Ganache(Local Blockchain)
 
 ```` 
 Download Ganache from https://truffleframework.com/ganache

 Go into Download folder uisng cd
  
  cd Downloads
  sudo chmod 777 ganache-1.2.3-x86_64.AppImage
  ./ganache-1.2.3-x86_64.AppImage
 ````

 > Clone Hospital PoC

```
git clone https://github.com/vazratkaravinash/hospitalpoc.git
```

> Install node modules

```
cd hospitalpoc
(If you want to deploy smart contract on blockchain. For very First time, this is a require step).
npm run prebuild
npm start
```

> Application guide

```
Doctor portal
 Navigate to below URL:
    http://localhost:3000/addDoctor

Patient portal
 Navigate to below URL:
    http://localhost:3000/addPatient
```

## Authors
- Avinash Vazratkar <avinashvazratkar@gmail.com>

## License
Copyright (c) 2019 Avinash Vazratkar
