
-- Get all product names and images for release 23.11.0
select rel.name, p.name, pl.support_status, ci.purl
from container_images ci
join product_lifecycles pl on ci.purl = pl.container_image_id
join releases rel on pl.release_id = rel.id
join products p on ci.product_id = p.id
where rel.name = '23.11.0';

-- Get all trino images for release 23.11.0
select rel.name, p.name, pl.support_status, ci.purl
from container_images ci
join product_lifecycles pl on ci.purl = pl.container_image_id
join releases rel on pl.release_id = rel.id
join products p on ci.product_id = p.id
where rel.name = '23.11.0' and p.name = 'trino';


