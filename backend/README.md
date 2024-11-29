# Cách sử dụng backend
# Project Structure:
- `server.js`: file server
- `controller`: định nghĩa các hàm cho server
- `routes`: định nghĩa các API routes.
# Lưu ý khi sử dụng:
Thêm file `.env` vào folder `backend`: 
- PORT=5000
- DB_USERNAME=<your_username>
- DB_PASSWORD=<your_password>
- DB_SERVER="127.0.0.1
- DATABASE="btl2Export"
- DATABASE_URL="sqlserver://<your_localhost>:1433;database=<your_databasename>;user=<your_username>;password=<your_password>;trustServerCertificate=true"
# Cách chạy file backend
- `npm run start:dev`: khởi động server
- `npx prisma db pull`: Khởi tạo file prisma schema, cái này đã có sẵn nên khỏi làm cũng được
