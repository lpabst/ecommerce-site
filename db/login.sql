select * from amazonusers
where username ilike $1 and
userpassword = $2