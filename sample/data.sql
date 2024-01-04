insert into releases (name, date, released) values ('23.11.0', '2023-11-29', true);
insert into products (name) values ('airflow'), ('druid'), ('trino');
insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(1, 1, '2.6.1', 'docker.stackable.tech/stackable/airflow:2.6.1-stackable23.11.0', 'DEPRECATED'),
(1, 1, '2.6.3', 'docker.stackable.tech/stackable/airflow:2.6.3-stackable23.11.0', 'LONG_TERM_SUPPORT'),
(1, 1, '2.7.2', 'docker.stackable.tech/stackable/airflow:2.7.2-stackable23.11.0', 'GENERAL_AVAILABILITY');
