set search_path to feature_tracker;

-- Get all release versions of release 2023-11
select rel.name, rev.version, rev.created_at
from releases rel
join release_versions rev on rel.id = rev.release_id
where rel.name = '2023-11';

--  name   | version |     created_at      
-- --------+---------+---------------------
-- 2023-11 | 23.11.0 | 2023-11-29 00:00:00

-- Get the support status of all product versions in release 2023-11
select rel.name as release_name, p.name as product_name, pv.version, pl.support_status
from releases rel
join product_lifecycles pl on pl.release_id = rel.id
join product_versions pv on pl.product_version_id = pv.id
join products p on pv.product_id = p.id
where rel.name = '2023-11';

-- release_name |  product_name  | version |    support_status    
-- -------------+----------------+---------+----------------------
-- 2023-11      | Apache Airflow | 2.6.1   | DEPRECATED
-- 2023-11      | Apache Airflow | 2.6.3   | LONG_TERM_SUPPORT
-- 2023-11      | Apache Airflow | 2.7.2   | GENERAL_AVAILABILITY
-- 2023-11      | Apache Druid   | 26.0.0  | GENERAL_AVAILABILITY
-- 2023-11      | Apache Druid   | 27.0.0  | GENERAL_AVAILABILITY
-- 2023-11      | Trino          | 414     | DEPRECATED
-- 2023-11      | Trino          | 428     | GENERAL_AVAILABILITY

-- Get all release components (images) for all versions of release version 23.11.0
select rev.version as release_version, p.name as product_name, pv.version, rc.purl
from release_versions rev
join release_components rc on rc.release_version = rev.version
join product_versions pv on pv.id = rc.product_version_id
join products p on pv.product_id = p.id
where rev.version = '23.11.0';

--  release_version |  product_name  | version |           purl                                           
-- -----------------+----------------+---------+--------------------------------
--  23.11.0         | Apache Airflow | 2.6.1   | pkg:docker/stackable/airflow...
--  23.11.0         | Apache Airflow | 2.6.3   | pkg:docker/stackable/airflow... 
--  23.11.0         | Apache Airflow | 2.7.2   | pkg:docker/stackable/airflow... 
--  23.11.0         | Apache Druid   | 26.0.0  | pkg:docker/stackable/druid:2... 
--  23.11.0         | Apache Druid   | 27.0.0  | pkg:docker/stackable/druid:2... 
--  23.11.0         | Trino          | 414     | pkg:docker/stackable/trino:4... 
--  23.11.0         | Trino          | 428     | pkg:docker/stackable/trino:4... 

