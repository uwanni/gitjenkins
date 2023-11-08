use cog;
select
ao2.id as `id`,
	ao.mobile_no as `Mobile No`,
	ao.email as `Email`,
	GROUP_CONCAT(i.title, '(Qty:', ao.item_quantity, ')' SEPARATOR ',') as `Items`,
	sum(ao2.total_amount) as `Total Amount`,
	c2.name as `City`,
	ao.start_date as `Start Date`,
	ao.end_date as `End Date`,
	ao.created_at as `Created At`,
	ao.updated_at as `Updated At`,
	ao.status as `Drop Status`,
	ao2.checkout_page_loaded as `checkout_Loaded`,
	ao2.payment_page_loaded as `payment_Loaded`
	
FROM
	abandoned_reservations ao
inner join items i on
	i.id = ao.item_id
inner join delivery_area da on
	da.id = ao.delivery_area_id
inner join cities c2 on
	da.city_id = c2.id
inner join abandoned_orders ao2 on
	ao.abandoned_order_id = ao2.id
where
	ao.updated_at between '2023-10-10 07:00:00' and '2023-10-13 6:59:59'
	and ao.user_id not in (
	select
		users.id
	from
		`users`
	where
		`email` like '%cloudofgoods%'
		or `email` like '%incubatelabs%')
	and ao.abandoned_order_id != 0
	and ao.status in ('PAYMENT_TODO', 'RESERVATION_TODO', 'CHECKOUT_TODO', 'CHECKOUT_CC_FAILED', 'CHECKOUT_COD_FAILED')
	and ao.delivery_area_id != 0
	and (ao.email != 'N/A'
		or ao.mobile_no != 'N/A')
GROUP BY
	ao.abandoned_order_id
