-- This is an empty migration.
UPDATE products as p set code_name = c.code_name
FROM (values
  (35, 'hbase'),
  (36, 'kafka'),
  (38, 'airflow'),
  (39, 'druid'),
  (40, 'hadoop'),
  (41, 'hive'),
  (42, 'nifi'),
  (43, 'spark-k8s'),
  (44, 'superset'),
  (45, 'trino'),
  (46, 'zookeeper')
) as c(id, code_name)
WHERE c.id = p.id;
