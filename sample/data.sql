insert into products (name) values ('airflow'), ('druid'), ('trino');

--
-- Insert data for release 23.11.0
--
insert into releases (id, name, date, released) values (1, '23.11.0', '2023-11-29', true);

insert into container_images (purl, product_version, product_id) values
('pkg:docker/stackable/airflow:2.6.1-stackable23.11.0?repository_url=docker.stackable.tech', '2.6.1', 1),
('pkg:docker/stackable/airflow:2.6.3-stackable23.11.0?repository_url=docker.stackable.tech', '2.6.3', 1),
('pkg:docker/stackable/airflow:2.7.2-stackable23.11.0?repository_url=docker.stackable.tech', '2.7.2', 1),
('pkg:docker/stackable/druid:26.0.0-stackable23.11.0?repository_url=docker.stackable.tech', '26.0.0', 2),
('pkg:docker/stackable/druid:27.0.0-stackable23.11.0?repository_url=docker.stackable.tech', '27.0.0', 2),
('pkg:docker/stackable/trino:414-stackable23.11.0?repository_url=docker.stackable.tech', '414', 3),
('pkg:docker/stackable/trino:428-stackable23.11.0?repository_url=docker.stackable.tech', '428', 3);

insert into product_lifecycles (release_id, container_image_id, support_status)
values
(1, 'pkg:docker/stackable/airflow:2.6.1-stackable23.11.0?repository_url=docker.stackable.tech', 'DEPRECATED'),
(1, 'pkg:docker/stackable/airflow:2.6.3-stackable23.11.0?repository_url=docker.stackable.tech', 'LONG_TERM_SUPPORT'),
(1, 'pkg:docker/stackable/airflow:2.7.2-stackable23.11.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY'),
(1, 'pkg:docker/stackable/druid:26.0.0-stackable23.11.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY'),
(1, 'pkg:docker/stackable/druid:27.0.0-stackable23.11.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY'),
(1, 'pkg:docker/stackable/trino:414-stackable23.11.0?repository_url=docker.stackable.tech', 'DEPRECATED'),
(1, 'pkg:docker/stackable/trino:428-stackable23.11.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY');

--
-- Insert data for release 23.7.0
--
insert into releases (id, name, date, released) values (2, '23.7.0', '2023-07-28', true);

insert into container_images (purl, product_version, product_id) values
('pkg:docker/stackable/airflow:2.4.1-stackable23.7.0?repository_url=docker.stackable.tech', '2.4.1', 1),
('pkg:docker/stackable/airflow:2.6.1-stackable23.7.0?repository_url=docker.stackable.tech', '2.6.1', 1),
('pkg:docker/stackable/druid:24.0.0-stackable23.7.0?repository_url=docker.stackable.tech', '24.0.0', 2),
('pkg:docker/stackable/druid:26.0.0-stackable23.7.0?repository_url=docker.stackable.tech', '26.0.0', 2),
('pkg:docker/stackable/trino:414-stackable23.7.0?repository_url=docker.stackable.tech', '414', 3),
('pkg:docker/stackable/trino:403-stackable23.7.0?repository_url=docker.stackable.tech', '403', 3);

insert into product_lifecycles (release_id, container_image_id, support_status)
values
(2, 'pkg:docker/stackable/airflow:2.6.1-stackable23.7.0?repository_url=docker.stackable.tech', 'DEPRECATED'),
(2, 'pkg:docker/stackable/airflow:2.4.1-stackable23.7.0?repository_url=docker.stackable.tech', 'LONG_TERM_SUPPORT'),
(2, 'pkg:docker/stackable/druid:26.0.0-stackable23.7.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY'),
(2, 'pkg:docker/stackable/druid:24.0.0-stackable23.7.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY'),
(2, 'pkg:docker/stackable/trino:414-stackable23.7.0?repository_url=docker.stackable.tech', 'DEPRECATED'),
(2, 'pkg:docker/stackable/trino:403-stackable23.7.0?repository_url=docker.stackable.tech', 'GENERAL_AVAILABILITY');


