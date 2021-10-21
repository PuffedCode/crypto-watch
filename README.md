# Crypto Watch

A web application that shows: Prices of Bitcoin and Ethereum from two different exchanges/sources. 

## Installation

First clone the repository. Then install Node Package Manager on both folders.

**crypto-watch**

**crypto-watch-backend**

```bash
npm install or npm i
```

## Usage

First, start up the server by going into **crypto-watch-backend** and run the command.

```bash
nodemon server.js
```

Then we can startup the frontend by going into **crypto-watch** and run the command.

```bash
npm start
```

## Questionnaire:
1. Are there any sub-optimal choices( or shortcuts taken due to limited time ) in your implementation?

**Ans:** Unfortunately there were some sub-optimal choices in my implementation. As I have limited free time, I use setInterval() as a way to consistently fetch data from my server instead of implementing web sockets which I am unfamiliar with, and it is actually a more efficient way to live pull data.

2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

**Ans:** As mentioned I did not spend a lot of time on this project, so there were no parts of it that were over-designed. Most of the implementations were actually simple designs.

3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?

**Ans:** As I am still fairly new to system design. So, from my current software architecture, there are a few flaws. If the webserver fails, the entire application fails this can be seen if I were to stop my server and still run the frontend. 

If I were to scale my solution to 100 users/second traffic, I would add a load balancer to my design this way if a single server ever goes down, the traffic will be directed to the rest of the servers in the server pool. If the traffic ever goes from 100 users/second to 1000 users/second all I have to do is add more servers to the webserver pool and the load balancer will route the traffic. 

Another change is that I need to add a database for the users, their data, and user session, we can either choose a relational or non-relational database depending on the needs of the app. Then I could scale the app horizontally with a stateless system. Which also works great on load balancer.

4. What are some other enhancements you would have made if you had more time to do this implementation

**Ans:** Unfortunately I did not spend a lot of time on this project. An enhancement that would definitely benefit the app is using web-socket to consistently pull data and display them. Another enhancement would be to add a button that shows a modal with both exchange's prices graphs history by using Chart.js. Another enhancement would be to change the text color of the price or show an up or down arrow when the prices change, this way the user can see the changes of price.# crypto-watch
# crypto-watch
# crypto-watch
# crypto-watch
# crypto-watch
