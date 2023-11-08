use cog;
SELECT
	ao.id,
	c.name as 'city',
	Group_concat(i.title, '(Qty:', ar.item_quantity, ')' SEPARATOR ',') AS 'Items',
	sum(ao.total_amount) as total_amount,
	ar. start_date,
	ar.end_date,
	ar.created_at,
	ar.updated_at
	
FROM
	abandoned_orders ao
LEFT JOIN abandoned_reservations ar
ON
	ao.cart_id = ar.cart_id
LEFT JOIN items i
ON
	ar.item_id = i.id
INNER JOIN delivery_area da
ON
	da.id = ar.delivery_area_id
INNER JOIN cities c
ON
	c.id = da.city_id
WHERE
	ao.user_id = 0
	AND ao.created_at BETWEEN '2023-10-11 07:00:00' AND '2023-10-13 6:59:59'
	AND ( ao.email = 'N/A'
		AND ao.mobile_no = 'N/A')
GROUP BY
	ao.id;