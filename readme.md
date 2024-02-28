# Eigen Backend Test
## Express + Prisma + PostgreSQL + JWT
Note:
1. Because the prisma feature, shadow database, the database user must be a super user or have CREATEDB privilege. So, simply use root user or grants the privileges to new user or existing user account. For more information, visit this [link](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database#shadow-database-user-permissions)