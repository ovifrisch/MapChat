# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {email: "daniel@gmail.com", username: "daniel", password: "password", longitude: -117.081839, latitude: 32.724601},
  {email: "alina@gmail.com", username: "alina", password: "password", longitude: -122.438625, latitude: 37.464643},
  {email: "neel@gmail.com", username: "neel", password: "password", longitude: -122.170899, latitude: 37.423640},
  {email: "minu@gmail.com", username: "minu", password: "password", longitude: -121.744046, latitude: 38.552309},
  {email: "derek@gmail.com", username: "derek", password: "password", longitude: -117.826331, latitude: 33.675120}
  ])
