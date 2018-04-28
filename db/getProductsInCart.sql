select * from amazoncart 
JOIN amazonproducts ON amazonproducts.id = amazoncart.productid
where userid = 1