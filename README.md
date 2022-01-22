# dndstoremaker

If you are looking to create a sharable store for your campaign, go to:(https://www.dndstoremaker.com/)

If you are looking to build and deploy this as an adaptation of your own project, check the information below.

Notes:
Category_id 90 is reserved for Custom Items, be sure to inject this data into your own database
Uncomment and use /api/seed-sql.js to seed your database
All seed data is provided by the wonderful team over at D&D 5e API (http://www.dnd5eapi.co/)

For local deployment, set up mysql database and create a .env file out of the TEMPLATE.env

```bash
npm install
npm run dev // Work locally
npm run build
npm run start
```

mySQL Schema
Tables:
[category]

- category_id => int (primary, auto)
- name => string

[item]

- item_id => int (primary, auto)
- category_id => int
- name => string
- url => string

[item_details]

- item_details_id => int (primary, auto)
- item_id => int
- details => json

[user]

- username => string
- password => Argon2(string)
- email => string
- create_time => DateTime (auto)
- id => int (primary, auto)
