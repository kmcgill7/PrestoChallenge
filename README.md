# PrestoChallenge

## Objective
Design and implement an API endpoint and database schema for returning
a list of items for a given restaurant.

## Solution
I set up Docker containers for a Postgres image and Node.js server.

My schema consists of a Restaurant, Item, and Modification table, where every item
or modification is listed in the Item table. The Modification table has two foreign keys
into the Item table. These define the relationships between items and modifiers.

When a request for a restaurant's items is made, the resulting query grabs the items and
the modifier mappings for that restaurant since all of that information needs to be fetched up front.
Then I recursively build an ojbect for the JSON response by building the graph of relationships
that I pulled from Postgres.

### Notes
- Prices in the db are stored as integers to prevent loss of precision; they represent the number of cents.

### TODOs
Obviously there are lots of things we need to do to make this production ready.
Better exception handling, logging, mounting the volume for Postgres outside of the
Docker container, and authentication/security middleware are a few of the things left to do.

## Setup
1. clone repository to your machine using `git clone git@github.com:kmcgill7/PrestoChallenge.git`
2. run `docker-compose up` from inside the `PrestoChallenge` directory
