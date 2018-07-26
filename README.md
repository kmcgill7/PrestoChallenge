# PrestoChallenge

## Objective
Design and implement an API endpoint and database schema for returning
a list of items for a given restaurant.

## Solution
I spun up Docker containers for a Postgres image and Node.js server, and set up the schema
for the restaurant items and modifiers. I chose to use a foreign key mapping for items
to modifiers, and modifiers to modifiers. When a request for a restaurant's items is made,
the resulting query grabs the items and modifiers associated with that restaurant and the
foreign key mapping for item -> mod and mod -> mod for that restaurant as well. We construct an
object for return that is built from the items, mods, and mappings.

### Notes
- Prices in the db are stored as integers to prevent loss of precision; they represent the number of cents.

### TODOs
Obviously there are lots of things we need to do to make this production ready.
Better exception handling, logging, mounting the volume for Postgres outside of the
Docker container, and authentication/security middleware are a few of the things left to do.

## Setup
1. clone repository to your machine using `git clone git@github.com:kmcgill7/PrestoChallenge.git`
2. run `docker-compose up` from inside the `PrestoChallenge` directory
