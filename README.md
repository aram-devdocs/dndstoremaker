# dndstoremaker

// Category_id 90 is reserved for Custom Items

mySQL
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
