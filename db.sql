CREATE TABLE restaurants (
    -- increments a big int by 1 so that all ids are unique and automatically added, and the not null constraint
id BIGSERIAL NOT NULL PRIMARY KEY,
name varchar(50) NOT NULL, 
city varchar(50) NOT NULL, 
price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

INSERT INTO restaurants (name, city, price_range) values('Taco Bell', 'New York', 1);

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT REFERENCES restaurants(id) NOT NULL,
name varchar(50) NOT NULL, 
review text NOT NULL, 
rating INT NOT NULL check(rating>=1 and rating<=5)
);