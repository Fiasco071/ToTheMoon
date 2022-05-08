<h1 align="center"> 🌕🚀: To The Moon 🚀🌕 </h1> <a name="top"> </a>

<h5 align="center">  By: <a href="https://github.com/AriannaNRobinson">Arianna Robinson</a> - <a href="https://github.com/Kristen-Reid">Kristen Reid</a> - <a href="https://github.com/rammartinez00">Rami Martinez</a> - <a href="https://github.com/Fiasco071">Steve Choi</a> - <a href="https://tothemoon-investment-app.herokuapp.com/"><i>Live site</i></h5>

<h2> About </h2>
Rocket Note is a clone of Evernotes. Rocket notes is where you can save all your important thoughts in an organized way!

   - [Features](#features)
   - [Technologies Used](#tech)
   - [How to use our application](#howto)
   
   
   
<h2> Features </h2> <a name="features"></a>
 
    With our application, you can simulate stock datas on different real stocks at a current value.
         * You can add funds to your wallet.
         * With sufficient funds in your wallet, you are able to browse through and select stocks you want to "purchase".
         * You can see a projection of the said data set in a projection of a year. 
         * You can view all your assets that you have
         * You can view your history of all the transactions made in the application.

<h2>Technologies Used</h2> <a name="tech"></a>
   
   <img src="https://user-images.githubusercontent.com/93681149/167308732-afeeb5f2-d9a1-47ab-b8d9-82cd44b00b7e.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308602-b05ea259-dd61-4df9-8f45-d7daeece6491.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308754-79d7f324-d62d-461e-aa15-32487f495403.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308772-5912f7f3-522a-4fe5-b176-575a91455823.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308802-46d28d53-dc35-4146-86f1-2afa9fdcbac0.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308823-588c1cbe-ef15-47ba-8d3f-944710a00ac6.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308846-24aa684c-2a5d-4d32-b365-4a0de8714408.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308866-01f03689-0b65-4ddd-803f-4a23a0253e35.svg" width="60px" align="left">
   <img src="https://user-images.githubusercontent.com/93681149/167308908-2aacacf3-d30a-4b00-97ed-3c034e5bcadd.svg" width="60px">
  
   
   

<h2> Getting started </h2><a name="howto"></a>
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/Fiasco071/ToTheMoon.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Dev Containers (Option for M1 Users)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. 

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.
   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

3. Create a new project on Heroku.

4. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

5. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

6. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

7. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

8. Push to your `main` branch!

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |
