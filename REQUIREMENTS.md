# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index ([Get] /products)
- Show (args: product id) ([Get] /products/:id)
- Create (args: Product)[token required] ([Post] /products)
- [OPTIONAL] Top 5 most popular products ([Get] /products_most_popular)
- [OPTIONAL] Products by category (args: product category) ([Get] /products_by_category/:category)

#### Users
- Index [token required] ([Get] /users)
- Show (args: id)[token required] ([Get] /users/:id)
- Create (args: User) ([Post] /users)

#### Orders
- Current Order by user (args: user id)[token required] ([Get] /orders/:id)
- [OPTIONAL] Completed Orders by user (args: user id)[token required] ([Get] /orders_completed/:id)

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

###### Table:
    Products (id:serial key, name:varchar, price:number, category:varchar)

#### User
- id
- first_name
- last_name
- password

###### Table:
    Users (id: serial key, first_name: varchar, last_name: varchar, password: varchar)

#### Orders
- id
- user_id
- status of order (active or complete)

###### Table:
    Orders (id: serial key, user_id: integer[foreign key to Users table], status: varchar)

#### Order products table
- id
- order_id
- product_id
- quantity

###### Table:
    OrderProducts (id: serial key, order_id: integer[foreign key to Orders table], product_id: integer[foreign key to Products table], quantity: integer)
