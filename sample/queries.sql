
-- Get all product names and images for release 23.11.0
select rel.name, p.name, pl.image_url
from product_lifecycles pl
join releases rel on pl.release_id = rel.id
join products p on pl.product_id=p.id
where rel.name = '23.11.0';

-- Get all trino images for release 23.11.0
select rel.name, p.name, pl.image_url
from product_lifecycles pl
join releases rel on pl.release_id = rel.id
join products p on pl.product_id=p.id
where rel.name = '23.11.0' and p.name = 'trino';

