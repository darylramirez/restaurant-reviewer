CREATE TABLE restaurants (
    -- increments a big int by 1 so that all ids are unique and automatically added, and the not null constraint
id BIGSERIAL NOT NULL PRIMARY KEY,
name varchar(50) NOT NULL, 
city varchar(50) NOT NULL, 
price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

INSERT INTO restaurants (name, city, price_range) values('Taco Bell', 'New York', 1);
