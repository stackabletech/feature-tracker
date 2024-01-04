insert into products (name) values ('airflow'), ('druid'), ('trino');

--
-- Insert data for release 23.11.0
--
insert into releases (name, date, released) values ('23.11.0', '2023-11-29', true);

insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(1, 1, '2.6.1', 'docker.stackable.tech/stackable/airflow:2.6.1-stackable23.11.0', 'DEPRECATED'),
(1, 1, '2.6.3', 'docker.stackable.tech/stackable/airflow:2.6.3-stackable23.11.0', 'LONG_TERM_SUPPORT'),
(1, 1, '2.7.2', 'docker.stackable.tech/stackable/airflow:2.7.2-stackable23.11.0', 'GENERAL_AVAILABILITY');

insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(2, 1, '26.0.0', 'docker.stackable.tech/stackable/druid:26.0.0-stackable23.11.0', 'LONG_TERM_SUPPORT'),
(2, 1, '27.0.0', 'docker.stackable.tech/stackable/druid:27.0.0-stackable23.11.0', 'GENERAL_AVAILABILITY');


insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(3, 1, '414', 'docker.stackable.tech/stackable/trino:414-stackable23.11.0', 'DEPRECATED'),
(3, 1, '428', 'docker.stackable.tech/stackable/trino:428-stackable23.11.0', 'GENERAL_AVAILABILITY');

--
-- Insert data for release 23.7.0
--
insert into releases (name, date, released) values ('23.7.0', '2023-07-28', true);

insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(1, 2, '2.4.1', 'docker.stackable.tech/stackable/airflow:2.4.1-stackable23.7.0', 'DEPRECATED'),
(1, 2, '2.6.1', 'docker.stackable.tech/stackable/airflow:2.6.1-stackable23.7.0', 'GENERAL_AVAILABILITY');

insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(2, 2, '24.0.0', 'docker.stackable.tech/stackable/druid:24.0.0-stackable23.7.0', 'DEPRECATED'),
(2, 2, '26.0.0', 'docker.stackable.tech/stackable/druid:26.0.0-stackable23.7.0', 'LONG_TERM_SUPPORT');


insert into product_lifecycles (product_id, release_id, product_version, image_url, support_status)
values
(3, 2, '414', 'docker.stackable.tech/stackable/trino:414-stackable23.7.0', 'GENERAL_AVAILABILITY'),
(3, 2, '403', 'docker.stackable.tech/stackable/trino:403-stackable23.7.0', 'DEPRECATED');

