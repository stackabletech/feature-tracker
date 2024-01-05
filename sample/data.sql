insert into products (id, name) values (1, 'airflow'), (2, 'druid'), (3, 'trino');

insert into product_versions (id, product_id, version) values
(1, 1, '2.6.1'),
(2, 1, '2.6.3'),
(3, 1, '2.7.2'),
(4, 2, '26.0.0'),
(5, 2, '27.0.0'),
(6, 3, '414'),
(7, 3, '428'),
(8, 1, '2.4.1'),
(9, 2, '24.0.0'),
(10, 3, '403');


--
-- Insert data for release 23.11.0
--
insert into releases (id, name, date, released) values (1, '23.11', '2023-11-29', true);

insert into release_versions (version, release_id, created_at)  values ('23.11.0', 1, '2023-11-29');

insert into release_component (purl, product_version_id, release_version) values
('pkg:docker/stackable/airflow:2.6.1-stackable23.11.0?repository_url=docker.stackable.tech', 1, '23.11.0'),
('pkg:docker/stackable/airflow:2.6.3-stackable23.11.0?repository_url=docker.stackable.tech', 2, '23.11.0'),
('pkg:docker/stackable/airflow:2.7.2-stackable23.11.0?repository_url=docker.stackable.tech', 3, '23.11.0'),
('pkg:docker/stackable/druid:26.0.0-stackable23.11.0?repository_url=docker.stackable.tech', 4, '23.11.0'),
('pkg:docker/stackable/druid:27.0.0-stackable23.11.0?repository_url=docker.stackable.tech', 5, '23.11.0'),
('pkg:docker/stackable/trino:414-stackable23.11.0?repository_url=docker.stackable.tech', 6, '23.11.0'),
('pkg:docker/stackable/trino:428-stackable23.11.0?repository_url=docker.stackable.tech', 7, '23.11.0'),

insert into product_lifecycles (support_status, product_version_id, release_id)
values
('DEPRECATED', 1, 1),
('LONG_TERM_SUPPORT', 2, 1),
('GENERAL_AVAILABILITY', 3, 1),
('GENERAL_AVAILABILITY', 4, 2),
('GENERAL_AVAILABILITY', 5, 2),
('DEPRECATED', 6, 3),
('GENERAL_AVAILABILITY', 7, 3);

--
-- Insert data for release 23.7.0
--
insert into releases (id, name, date, released) values (2, '23.7', '2023-07-28', true);

insert into release_versions (version, release_id, created_at)  values ('23.7.0', 1, '2023-07-29');

insert into release_component (purl, product_version_id, release_version) values
('pkg:docker/stackable/airflow:2.4.1-stackable23.7.0?repository_url=docker.stackable.tech', 8, '23.7.0'),
('pkg:docker/stackable/airflow:2.6.1-stackable23.7.0?repository_url=docker.stackable.tech', 1, '23.7.0'),
('pkg:docker/stackable/druid:24.0.0-stackable23.7.0?repository_url=docker.stackable.tech', 9,  '23.7.0'),
('pkg:docker/stackable/druid:26.0.0-stackable23.7.0?repository_url=docker.stackable.tech', 4,  '23.7.0'),
('pkg:docker/stackable/trino:414-stackable23.7.0?repository_url=docker.stackable.tech', 6, '23.7.0'),
('pkg:docker/stackable/trino:403-stackable23.7.0?repository_url=docker.stackable.tech', 10, '23.7.0');

insert into product_lifecycles (support_status, product_version_id, release_id)
values
('DEPRECATED',8 , 2),
('GENERAL_AVAILABILITY',9 , 2),
('GENERAL_AVAILABILITY',10, 2);


