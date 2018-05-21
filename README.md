# README

* Ruby version: `2.4+`

* Database initialization: `bundle exec rake db:create db:migrate db:seed`

* Webpacker: `yarn install`

* Development:

1. terminal 1: `./bin/webpack-dev-server`
2. terminal 2: `rails s -b 0.0.0.0`
3. Open `http://localhost:3000` in browser

* Heroku

1. `git push heroku master`
2. `heroku run rake db:migrate db:seed`
3. `heroku restart`
